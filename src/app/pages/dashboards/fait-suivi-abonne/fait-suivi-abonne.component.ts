import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';
import { DetailAbonneComponent } from './detail-suivi-abonne/detail-abonne.component';
import { DetailsSuiviAbonneService } from 'src/app/core/services/details-suivi-abonne.service';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';
import * as XLSX from 'xlsx';  // Import pour Excel
import { saveAs } from 'file-saver';

import * as FileSaver from 'file-saver';
import * as bootstrap from 'bootstrap';

import { Observable } from 'rxjs';

  // Import pour CSV
import { jsPDF } from 'jspdf';  // Import de jsPDF
import 'jspdf-autotable';  // Import du plugin autoTable pour jsPDF
import autoTable from 'jspdf-autotable';
import { SuiviAbonneDetailsService } from 'src/app/core/services/suivi-abonne-details.service';

@Component({
  selector: 'app-fait-suivi-abonne',
  templateUrl: './fait-suivi-abonne.component.html',
  styleUrls: ['./fait-suivi-abonne.component.scss']
})
export class FaitSuiviAbonneComponent {

  @Input() results: number[][] = []; // Tableau de paires [directionId, nombreAbonnesActifs]

  @Input() resultType: string = ''; // Type de résultats ('direction' ou 'typeAbonne')
  @Input() showCard: boolean = false;  // Déclaration de l'entrée


  loading: boolean = false; // Pour indiquer si les données sont en cours de chargement
  errorMessage: string | null = null; // Pour stocker les messages d'erreur
  item: any;
  tableHeaders: string[] = [];

  tableConfig: any;

  details: any[] = []; // Détails spécifiques à une direction
  selectedItem: string | null = null; // Direction sélectionnée
  selectedAbonneType: 'Abonnés actifs' | 'Abonnés facturés' | 'Abonnés résiliés' | 'Nombre total d\'abonnés' |'Nombre de Nombre de Résiliations' |  null = null;
  pageNumber: number | null = null;
  totalItems: number| null = null;
  
   // ➡️ Pour gérer la pagination :
   currentPage: number = 1; 
   itemsPerPage: number = 5; 

  

  constructor(private faitSuiviAbonneService: FaitSuiviAbonneService,
     //private SuiviAbonneDetailsService: SuiviAbonneDetailsService,
     private detailsSuiviAbonneService : DetailsSuiviAbonneService,
     private dateRangeService: DateRangeService,
    private apiTableConfigService: ApiTableConfigService) { }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['resultType'] && this.resultType) {
        this.tableHeaders = this.apiTableConfigService.getTableHeaders(this.resultType);
        console.log("Table Headers mis à jour:", this.tableHeaders);
      }
      
      if (changes['results']) {
        console.log("Résultats mis à jour:", this.results);
      }
    }

    onPageChange(page: number): void {
      // 👉 Si on clique sur la même page, ne rien faire
      if (this.currentPage === page) {
        return;
      }
    
      this.currentPage = page;
    
      // 👉 Scroller seulement si la page change
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onDetailsClick(row: any): void {
      // 1️⃣ Sélection de l'élément
      this.selectedItem = row[0];
      this.pageNumber = 1;
      this.details = [];
      this.totalItems = 0;
    
      if (!this.selectedItem) {
        console.warn('⚠️ Aucun élément sélectionné.');
        return;
      }
    
      // 2️⃣ Dates
      const startDate = this.dateRangeService.getStartDate();
      const endDate = this.dateRangeService.getEndDate();
      if (!startDate || !endDate) {
        alert('Veuillez sélectionner une date de début et une date de fin.');
        return;
      }
    
      // 3️⃣ Type d’abonné
      const abonneTypesMapping: Record<string, string> = {
        'abonnés actifs': 'Actif',
        'abonnés facturés': 'Facture',
        'abonnés résiliés': 'Resile',
        "nombre total d'abonnés": 'NombreTotal',
        'nombre de résiliations': 'NombreResi'
      };
      const typeAbonne = abonneTypesMapping[this.resultType?.split(' - ')[0].toLowerCase()];
      if (!typeAbonne) return console.warn('Type d’abonné inconnu :', this.resultType);
    
      // 4️⃣ Dimension
      const dimensionMapping: Record<string, string> = {
        'direction': 'direction',
        'produit': 'produit',
        'segment abonné': 'segment',
        'mode de facturation': 'mode',
        'type abonné': 'type',
        'puissance souscrite': 'puissance'
      };
      const dimension = dimensionMapping[this.resultType?.split(' - ')[1].toLowerCase()];
      if (!dimension) return console.warn('Dimension inconnue :', this.resultType);
    
      // 5️⃣ Valeur
      const valueMapping: Record<string, string> = {
        // 🔹 Directions
        "Direction régionale d'Abengourou": '1',
        "Direction régionale d'Abidjan Est": '2',
        "Direction régionale d'Abidjan Nord": '3',
        "Direction régionale d'Abidjan Sud": '4',
        'Direction régionale de Bouaké': '7',
        'Direction régionale de Daloa': '8',
        'Direction régionale de Gagnoa': '9',
        'Direction régionale de Korhogo': '10',
        'Direction régionale de Man': '11',
        'Direction régionale de San Pedro': '12',
        'Direction régionale de Yamoussoukro': '13',
        'Direction régionale de Yopougon': '14',
        // 🔹 Type Abonné
        'Administration': 'TypeAd',
        'Entreprise':  'TypeEntr',
        'Ménage': 'TypeMe',

        //mode de facturation
        'Postpayé': 'Fact1' ,
        'Prépayé': 'Fact2' ,
        
        // 🔹 Segments
        'Standard': '1',
        'PME': '5',
        'Grande Entreprise':'4',
        'Collectivité':'2',
        'Social':'3',
        'Etat-Central':'6',
        'Premium':'7',
        // 🔹 Produits
        'Basse tension': '1',
        'Haute tension':  '2',
        // 🔹 Puissances
        '3': '3','5': '5','6': '6','9': '9','10': '10','12': '12','15': '15','18': '18','20': '20','24': '24','36': '36','60': '60'
      };
    
      const value = valueMapping[this.selectedItem];
      if (!value) return console.warn('Valeur inconnue pour :', this.selectedItem);
    
      // 6️⃣ Appel service
      let serviceCall$: Observable<any[]>;
      switch (typeAbonne) {
        case 'Actif':
          serviceCall$ = this.detailsSuiviAbonneService.getAbonneActif(dimension, value, startDate, endDate);
          break;
        case 'Facture':
          serviceCall$ = this.detailsSuiviAbonneService.getAbonneFacture(dimension, value, startDate, endDate);
          break;
        case 'Resile':
          serviceCall$ = this.detailsSuiviAbonneService.getAbonneResile(dimension, value, startDate, endDate);
          break;
        case 'NombreTotal':
          serviceCall$ = this.detailsSuiviAbonneService.getNombreTotal(dimension, value, startDate, endDate);
          break;
        case 'NombreResi':
          serviceCall$ = this.detailsSuiviAbonneService.getNombreResiliation(dimension, value, startDate, endDate);
          break;
        default:
          return console.error('Type d’abonné non géré :', typeAbonne);
      }
    
      // 7️⃣ Subscription et modal
      serviceCall$.subscribe({
        next: (details) => {
          this.details = details;
          this.openModal();
        },
        error: (err) => {
          console.error('Erreur récupération détails :', err);
          alert('Erreur lors de la récupération des détails.');
        }
      });
    }
    
    // Modal
    private openModal(): void {
      const modalElement = document.getElementById('detailsModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
    
    
    
    

  
  
    exportToPDF() {
      const doc = new jsPDF();
    
      const resultType = this.resultType || 'rapport';
    
      // Formatage du titre en capitalisant chaque partie
      const capitalizedTitle = resultType
        .split('-')
        .map(part => part.trim().charAt(0).toUpperCase() + part.trim().slice(1))
        .join(' - ');
    
      const fileName = resultType.replace(/\s+/g, '_') + '.pdf';
    
      // Lecture du logo depuis un fichier local ou une URL via FileReader
      const logoUrl = 'assets/images/gs2e_logo.jpg'; // remplace par ton vrai chemin
    
      const reader = new FileReader();
      fetch(logoUrl)
        .then(response => response.blob())
        .then(blob => {
          reader.readAsDataURL(blob);
          reader.onload = () => {
            const logoData = reader.result as string;
    
            doc.addImage(logoData, 'PNG', 10, 10, 30, 15); // Logo en haut à gauche
    
            // Titre centré
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            const pageWidth = doc.internal.pageSize.getWidth();
            const titleWidth = doc.getTextWidth(capitalizedTitle);
            const titleX = (pageWidth - titleWidth) / 2;
            doc.text(capitalizedTitle, titleX, 40);
    
            // En-têtes dynamiques
            const headers = this.apiTableConfigService.getTableHeaders(resultType);
            this.tableHeaders = headers;
    
            if (this.results && this.results.length > 0) {
              autoTable(doc, {
                head: [headers],
                body: this.results.map((item, index) => {
                  const row: any[] = [index + 1];
                  headers.slice(1).forEach((_, colIndex) => {
                    row.push(item[colIndex]);
                  });
                  return row;
                }),
                startY: 50,
                headStyles: {
                  fillColor: [26, 189, 156], // #1abd9c
                  textColor: [255, 255, 255],
                  fontStyle: 'bold'
                },
                styles: {
                  halign: 'center',
                  font: 'helvetica',
                  fontSize: 10,
                  cellPadding: 3
                }
              });
            }
    
            // Footer avec date/heure en bas à gauche
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Généré le ${formattedDate}`, 10, doc.internal.pageSize.getHeight() - 10);
    
            // Sauvegarde du fichier PDF
            doc.save(fileName);
          };
        })
        .catch(error => {
          console.error('Erreur lors du chargement du logo :', error);
        });
    }
    
    
    
    

  // Méthode pour exporter en Excel
      exportToExcel(): void {
        if (!this.results || this.results.length === 0) {
          console.error('Aucune donnée à exporter.');
          return;
        }

        // Récupérer les en-têtes dynamiques
        const headers = this.apiTableConfigService.getTableHeaders(this.resultType);
        this.tableHeaders = headers;

        // Construire les données du tableau avec des clés correspondant aux en-têtes
        const dataForExcel = this.results.map((result, index) => {
          const row: any = { 'N°': index + 1 }; // Ajouter une colonne pour les numéros
          headers.slice(1).forEach((header, colIndex) => {
            row[header] = result[colIndex]; // Associer les valeurs des colonnes aux en-têtes
          });
          return row;
        });

        // Créer une feuille Excel à partir des données
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel);

        // Créer un classeur Excel et ajouter la feuille
        const workbook: XLSX.WorkBook = { Sheets: { 'Données': worksheet }, SheetNames: ['Données'] };

        // Générer le fichier Excel en tant que buffer
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Créer un blob à partir du buffer pour le téléchargement
        const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Télécharger le fichier
        saveAs(data, 'tableau.xlsx');
      }

            // Récupère les détails envoyés depuis le composant enfant
            onExportData(details: any[]) {
              this.details = details;
            }

            ModalToPDF() {
              if (this.details.length === 0) {
                alert("Aucune donnée à exporter.");
                return;
              }
            
              const doc = new jsPDF();
              const pageWidth = doc.internal.pageSize.getWidth();
            
              // Titre
              const title = "DETAIL DES ABONNES";
              const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
            
              // Logo (facultatif)
              const logoUrl = 'assets/images/gs2e_logo.jpg'; // adapte le chemin si nécessaire
              const reader = new FileReader();
            
              fetch(logoUrl)
                .then(response => response.blob())
                .then(blob => {
                  reader.readAsDataURL(blob);
                  reader.onload = () => {
                    const logoData = reader.result as string;
            
                    doc.addImage(logoData, 'PNG', 10, 10, 30, 15); // Logo en haut à gauche
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(14);
                    doc.text(title, titleX, 40); // titre centré après le logo
            
                    const headers = [["Code Abonné", "Nom et Prénom", "Statut"]];
                    const data = this.details.map(detail => [detail[0], detail[1], detail[2]]);
            
                    // Ajout du tableau avec pagination (11 lignes par page)
                    autoTable(doc, {
                      head: headers,
                      body: data,
                      startY: 50,
                      theme: 'grid',
                      headStyles: {
                        fillColor: [26, 189, 156], // #1abd9c
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                      },
                      styles: {
                        halign: 'center',
                        font: 'helvetica',
                        fontSize: 10,
                        cellPadding: 3
                      },
                      pageBreak: 'auto',
                      didDrawPage: (dataArg) => {
                        // Footer : date en bas à gauche
                        const currentDate = new Date().toLocaleString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        });
                        doc.setFontSize(10);
                        doc.setFont('helvetica', 'normal');
                        doc.text(`Généré le ${currentDate}`, 10, doc.internal.pageSize.getHeight() - 10);
                      },
                      rowPageBreak: 'avoid',
                    });
            
                    doc.save("details_abonnes.pdf");
                  };
                })
                .catch(error => {
                  console.error("Erreur de chargement du logo :", error);
                  // Même sans logo, on génère quand même le PDF
                  this.generateTableWithoutLogo(doc, title, pageWidth);
                });
            }
            
            // Méthode de secours sans logo
            private generateTableWithoutLogo(doc: jsPDF, title: string, pageWidth: number) {
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(14);
              const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
              doc.text(title, titleX, 20);
            
              const headers = [["Code Abonné", "Nom et Prénom", "Statut"]];
              const data = this.details.map(detail => [detail[0], detail[1], detail[2]]);
            
              autoTable(doc, {
                head: headers,
                body: data,
                startY: 50,
                theme: 'grid',
                styles: { halign: 'center', font: 'helvetica', fontSize: 10 },
                headStyles: { fillColor: [0, 122, 204], textColor: [255, 255, 255] },
                margin: { top: 30 },
                pageBreak: 'auto',
                didDrawPage: (dataArg) => {
                  const currentDate = new Date().toLocaleString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  doc.setFontSize(10);
                  doc.setFont('helvetica', 'normal');
                  doc.text(`Généré le ${currentDate}`, 10, doc.internal.pageSize.getHeight() - 10);
                },
                rowPageBreak: 'avoid',
              });
            
              doc.save("details_abonnes.pdf");
            }
            

  ModalToExcel() {
    if (this.details.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(this.details.map(detail => ({
      "Code Abonné": detail[0],
      "Nom et Prénom": detail[1],
      "Statut": detail[2]
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Abonnés");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(data, "details_abonnes.xlsx");
  }

      
    
    
    
      
      startDate(startDate: any, endDate: any) {
          throw new Error('Method not implemented.');
        }
        endDate(startDate: any, endDate: any) {
          throw new Error('Method not implemented.');
        }

  

}


/* getDetailsFunctions: Record<string, (category: string, key: any, start: string, end: string) => Observable<[string, number][]>> = {
        'actif': (category, key, start, end) =>
          this.SuiviAbonneDetailsService.getDetailActif(category as any, key, start, end),

        'facture': (category, key, start, end) =>
          this.SuiviAbonneDetailsService.getDetailFacture(category as any, key, start, end),

        'resilie': (category, key, start, end) =>
          this.SuiviAbonneDetailsService.getDetailResilie(category as any, key, start, end),

        'resiliation': (category, key, start, end) =>
          this.SuiviAbonneDetailsService.getDetailResiliation(category as any, key, start, end),

        'total': (category, key, start, end) =>
          this.SuiviAbonneDetailsService.getDetailTotal(category as any, key, start, end),
      }; */



      /* private mapCategory(selectedItem: string): { category: string, key: any } | null {
        const mapping: Record<string, { category: string, key: any }> = {
          // 🔹 Directions
          
          "Direction régionale d'Abengourou": { category: 'Direction', key: 1 },
          "Direction régionale d'Abidjan Est": { category: 'Direction', key: 2 },
          "Direction régionale d'Abidjan Nord" : { category: 'Direction', key: 3 },
          "Direction régionale d'Abidjan Sud": { category: 'Direction', key: 4 },
          'Direction régionale de Bouaké': { category: 'Direction', key: 7 },
          'Direction régionale de Daloa': { category: 'Direction', key: 8 },
          'Direction régionale de Gagnoa': { category: 'Direction', key: 9 },
          'Direction régionale de Korhogo': { category: 'Direction', key: 10 },
          'Direction régionale de Man': { category: 'Direction', key: 11 },
          'Direction régionale de San Pedro': { category: 'Direction', key: 12 },
          'Direction régionale de Yamoussoukro': { category: 'Direction', key: 13 },
          'Direction régionale de Yopougon': { category: 'Direction', key: 14 },

          // 🔹 Type Abonné
          'Administration': {category: 'TypeAbonne', key: ''},
          'Ménage': {category: 'TypeAbonne', key: ''},
          'Entreprise': {category: 'TypeAbonne', key: ''},


          //mode de facturation
          'Postpayé': { category: 'modeFact', key: 'Post' },
          'Prépayé': { category: 'modeFact', key: 'Pre' },
          'Forfaitaire': { category: 'TypeAbonne', key: 'For' },//


          // 🔹 Segment
          'Standard': { category: 'Segment', key: '1' },
          'PME': { category: 'Segment', key: '2' },
          'Grande Entreprise': { category: 'Segment', key: '3' },
          'Collectivité': { category: 'Segment', key: '4' },
          'Social':{ category: 'Segment', key: '' },
          'Etat-Central':{ category: 'Segment', key: '' },
          'Premium':{ category: 'Segment', key: '' },


          // 🔹 Produits
          'Basse tension': { category: 'Produit', key: '1' },
          'Haute tension': { category: 'Produit', key: '2' },

          // 🔹 Puissance
          '24': { category: 'Puissance', key: '1' },
          '9': { category: 'Puissance', key: '2' },
          '36': { category: 'Puissance', key: '3' },
          '5': { category: 'Puissance', key: '4' },
          '18': { category: 'Puissance', key: '5' },
          '15': { category: 'Puissance', key: '6' },
          '6': { category: 'Puissance', key: '7' },
          '60': { category: 'Puissance', key: '8' },
          '12': { category: 'Puissance', key: '9' },
          '3': { category: 'Puissance', key: '10' },


        };

        return mapping[selectedItem] || null;
      }
 */



         /* getDetailsFunction(region: string, abonneType: string): ((start: string, end: string) => Observable<any>) | null {
          const serviceMapping: Record<string, string> = {
              'Abonnés actifs': 'getDetailActif',
              'Abonnés facturés': 'getDetailFacture',
              'Abonnés résiliés': 'getDetailResilie',
              'Nombre total d\'abonnés': 'getDetailTotal',
              'Nombre de Résiliations': 'getDetailResiliation'
          };
  
          const regionMapping: Record<string, string> = {
              'Direction régionale de Bouaké': 'Dir7',
              'Direction régionale Abidjan Centre': 'Dir11',
              'Direction régionale de Yopougon': 'Dir14',
              'Direction régionale Abidjan Sud': 'Dir4',
              'Direction régionale Abidjan Nord': 'Dir10',
              'Direction régionale Abengourou': 'Dir1',
              'Direction régionale Abidjan Est': 'Dir2',
              'Direction régionale Abidjan Nord': 'Dir10',
              'Direction régionale Abidjan Nord': 'Dir10',
              'Direction régionale Abidjan Nord': 'Dir10',
              'Direction régionale de Daloa': 'Dir8',
              'Direction régionale de Gagnoa': 'Dir10',
              'Direction régionale de Man': 'Dir11',
              'Direction régionale de Yamoussoukro': 'Dir13',

              'Postpayé': 'TypPost',
              'Prépayé': 'TypPre',
              'Forfaitaire':'TypFor',
              'Domestique conventionnel': 'Seg1',
              'Domestique Général': 'Seg2',
              'Domestique Social': 'Seg3',
              'Professionnel Général': 'Seg4',
              'Basse tension': 'Prod1',
              'Haute tension': 'Prod2',
              '5': 'Ps1',
              '10': 'Ps2',
              '15': 'Ps4',
              '20': 'Ps3',
              '25': 'Ps5',
              
          };
  
          const serviceKey = serviceMapping[abonneType];
          const regionKey = regionMapping[region];
  
          if (serviceKey && regionKey) {
              const functionName = `${serviceKey}${regionKey}`; // Exemple : getDetailActifDir7
              return (this.SuiviAbonneDetailsService as any)[functionName]?.bind(this.SuiviAbonneDetailsService) || null;
          }
  
          return null;
      } */ 
            
            
                  /* onDetailsClick(result: any): void {

            this.selectedItem = result[0]; // Ex: Direction, Produit, Segment
            this.pageNumber = 1; // Pour revenir à la 1ère page
            this.details = [];   // Vider les anciens détails
            this.totalItems = 0; // Réinitialiser le total
            console.log('Élément sélectionné :', this.selectedItem);

            if (!this.selectedItem) {
                console.warn('Aucun élément sélectionné.');
                return;
            }

            // Récupération des dates sélectionnées
            const startDate = this.dateRangeService.getStartDate();
            const endDate = this.dateRangeService.getEndDate();

            if (!startDate || !endDate) {
                console.warn('Dates non définies via le service DateRange.');
                alert('Veuillez sélectionner une date de début et une date de fin.');
                return;
            }

            // ➡️ Types d'abonnés
            const abonneTypes = [
                'Abonnés actifs',
                'Abonnés facturés',
                'Abonnés résiliés',
                'Nombre total d\'abonnés',
                'Nombre de Résiliations'
            ];

            // ➡️ Catégories d'abonnés
            const categories = [
                'direction',
                'produit',
                'segment abonné',
                'type abonné',
                'puissance souscrite'
            ];

            // Génération dynamique du mapping
            const abonneTypeMapping: Record<string, string> = abonneTypes.reduce((map, type) => {
                categories.forEach(category => {
                    const key = `${type.toLowerCase()} - ${category}`;
                    map[key] = type;
                });
                return map;
            }, {} as Record<string, string>);

            // Déterminer le type d'abonné basé sur resultType
            const abonneType = abonneTypeMapping[this.resultType?.toLowerCase()];

            if (!abonneType) {
                console.warn('Type d’abonné inconnu pour resultType:', this.resultType);
                return;
            }

            // Vérification si l'élément sélectionné existe dans le mapping
            const detailsFunction = this.getDetailsFunctions(this.selectedItem, abonneType);
            


            if (!detailsFunction) {
                console.warn('Aucune correspondance trouvée pour', this.selectedItem, 'et', abonneType);
                this.details = [];
                return;
            }

            detailsFunction(startDate, endDate).subscribe({
                next: (details) => {
                    this.details = details;
                    console.log('Détails récupérés :', details);
                    this.openModal();
                },
                error: (err) => {
                    console.error('Erreur lors de la récupération des détails :', err);
                    alert('Une erreur est survenue lors de la récupération des détails.');
                }
            });
        }  */