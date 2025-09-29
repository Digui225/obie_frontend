import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
import { FaitSuiviRevenuService } from 'src/app/core/services/fait-suivi-revenu.service';


@Component({
  selector: 'app-fait-suivi-revenu',
  templateUrl: './fait-suivi-revenu.component.html',
  styleUrls: ['./fait-suivi-revenu.component.scss']
})
export class FaitSuiviRevenuComponent {
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
  selectedRevenuType: 'Revenu énergie' | 'Revenu total' | 'Redevance facturée' | 'Droit de timbre encaissé' |'avance sur consommation encaissé' |
          'avance sur consommation remboursée'|
          'montant impayés'|
          'montant des factures'|
          'montant encaissé'|
          'Montant avoir'|
          'Montant remboursement'|
          'Taux de recouvrement'|
          'Chiffre d’affaires global'| null = null;

   pageNumber: number | null = null;
  totalItems: number| null = null;

  // ➡️ Pour gérer la pagination :
  currentPage: number = 1; 
  itemsPerPage: number = 5;
  

  constructor(private faitSuiviRevenuService: FaitSuiviRevenuService,
     private SuiviAbonneDetailsService: SuiviAbonneDetailsService,
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
    

  /* exportToPDF(): void {
    const doc = new jsPDF();
    const columns = [
      { header: '#', dataKey: 'index' },
      { header: this.getTableHeader(0), dataKey: 'col1' },
      { header: this.getTableHeader(1), dataKey: 'col2' }
    ];
    const data = this.results.map((result, index) => ({
      index: index + 1,
      col1: result[0],
      col2: result[1]
    }));
  
    doc.text('Tableau des résultats', 10, 10);
    (doc as any).autoTable({
      head: [columns],
      body: data,
      startY: 20
    });
    doc.save('tableau.pdf');
  } */
  
    exportToPDFRev(): void {
      const doc = new jsPDF();
      const resultType = this.resultType || 'rapport_détail';
    
      // ====== Formatage du titre ======
      const capitalizedTitle = resultType
        .split('-')
        .map(part => part.trim().charAt(0).toUpperCase() + part.trim().slice(1))
        .join(' - ');
    
      // ====== Nom du fichier ======
      const now = new Date();
      const fileName = `${resultType}_${now.getFullYear()}-${(now.getMonth() + 1)
        .toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now
        .getHours().toString().padStart(2, '0')}h${now.getMinutes().toString().padStart(2, '0')}.pdf`;
    
      // ====== Logo ======
      const logoPath = 'assets/images/gs2e_logo.jpg';
      fetch(logoPath)
        .then(res => {
          if (!res.ok) throw new Error('Logo introuvable');
          return res.blob();
        })
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
    
          reader.onloadend = () => {
            const logoDataUrl = reader.result as string;
    
            // ✅ Logo en haut à gauche
            doc.addImage(logoDataUrl, 'PNG', 10, 10, 40, 15);
    
            // ✅ Titre centré
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            const pageWidth = doc.internal.pageSize.getWidth();
            const titleWidth = doc.getTextWidth(capitalizedTitle);
            const titleX = (pageWidth - titleWidth) / 2;
            doc.text(capitalizedTitle, titleX, 40);
    
            // ✅ Récup headers dynamiques
            const headers: string[] = this.apiTableConfigService.getTableHeaders(resultType) || [];
            this.tableHeaders = headers;
    
            // ✅ Génération du tableau
            if (this.results && this.results.length > 0 && headers.length > 0) {
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
                },
                bodyStyles: {
                  halign: 'center'
                }
              });
            } else {
              doc.text('Aucune donnée disponible', 20, 60);
            }
    
            // ✅ Footer avec date/heure en bas à gauche
            const formattedDate = now.toLocaleString('fr-FR', {
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
    
            // ✅ Sauvegarde du fichier
            doc.save(fileName);
          };
        })
        .catch(error => {
          console.error('Erreur lors du chargement du logo :', error);
          doc.text('Erreur lors de la génération du rapport', 20, 50);
          doc.save(fileName);
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
      const pageWidth = doc.internal.pageSize.getWidth(); // Récupère la largeur de la page

      // 📌 Définir le titre et le centrer
      const title = "DETAIL DES ABONNES";
      const titleX = (pageWidth - doc.getTextWidth(title)) / 2; // Centre le texte

      doc.text(title, titleX, 10); // Positionne le titre au centre, en Y=10

      const headers = [["Code Abonné", "Nom et Prénom", "Statut"]];
      const data = this.details.map(detail => [detail[0], detail[1], detail[2]]);

      // 📌 Ajout du tableau
      (doc as any).autoTable({
        head: headers,
        body: data,
        startY: 20,
        theme: 'grid', // Optionnel : ajoute un style de tableau
        styles: { halign: 'center' }, // Centre le texte dans les cellules
        headStyles: { fillColor: [0, 122, 204] } // Optionnel : couleur d'en-tête
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

      


      onDetailsClick(result: any): void {
        /* this.selectedItem = result[0]; // Ex: Direction, Produit, Segment
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
        const revenuTypes = [
          'revenu énergie',
          'revenu total',
          'revenu frais',
          'redevance facturée',
          'redevance encaissée',
          'droit de timbre encaissé',
          'avance sur consommation encaissé',
          'avance sur consommation remboursée',
          'montant impayés',
          'montant des factures',
          'montant encaissé',
          'Montant avoir',
          'Montant remboursement',
          'Taux de recouvrement',
          'Chiffre d’affaires global'

      ];

         // ➡️ Catégories
         const categories = [
          'direction',
          'produit',
          'segment abonné',
          'type abonné',
          'puissance souscrite'
      ];

      // Génération dynamique du mapping
      const revenuTypeMapping: Record<string, string> = revenuTypes.reduce((map, type) => {
        categories.forEach(category => {
            const key = `${type.toLowerCase()} - ${category}`;
            map[key] = type;
        });
        return map;
      }, {} as Record<string, string>);
    
        
    
        const revenuType = revenuTypeMapping[this.resultType?.toLowerCase()];
    
        if (!revenuType) {
            console.warn('Type revenu inconnu pour resultType:', this.resultType);
            return;
        }

        // Vérification si l'élément sélectionné existe dans le mapping
        const detailsFunction = this.getDetailsFunction(this.selectedItem, revenuType);

        if (!detailsFunction) {
            console.warn('Aucune correspondance trouvée pour', this.selectedItem, 'et', revenuType);
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
        }); */

      } 
    
        getDetailsFunction(region: string, revenuType: string): ((start: string, end: string) => Observable<any>) | null {
          const serviceMapping: Record<string, string> = {
              'Abonnés actifs': 'getDetailActif',
              'Abonnés facturés': 'getDetailFacture',
              'Abonnés résiliés': 'getDetailResilie',
              'Nombre total d\'abonnés': 'getDetailTotal',
              'Nombre de Résiliations': 'getDetailResiliation',
             /*  'revenu énergie':,
              'revenu total':,
              'revenu frais':,
              'redevance facturée': ,
              'redevance encaissée':,
              'droit de timbre encaissé':,
              'avance sur consommation encaissé':,
              'avance sur consommation remboursée':,
              'montant impayés':,
              'montant des factures':,
              'montant encaissé':,
              'Montant avoir':,
              'Montant remboursement':,
              'Taux de recouvrement':,
              'Chiffre d’affaires global': */
          };
  
          const regionMapping: Record<string, string> = {
              'Direction régionale du Centre Sud': 'Dir7',
              'Direction régionale Abidjan Centre': 'Dir11',
              'Direction régionale de Yopougon': 'Dir12',
              'Direction régionale Abidjan Sud': 'Dir9',
              'Direction régionale Abidjan Nord': 'Dir10',
              'Postpayé': 'Typ',
              'Domestique conventionnel': 'Seg1',
              'Domestique Général': 'Seg2',
              'Domestique Social': 'Seg3',
              'Professionnel Général': 'Seg4',
              'Basse tension': 'Prod1',
              'Haute tension': 'Prod2',
              '1': 'Ps1',
              '1.1': 'Ps2',
              '1.2': 'Ps3',
              '1.3': 'Ps4',
              '1.4': 'Ps5',
              '1.5': 'Ps6',
              '2': 'Ps7'
          };
  
          const serviceKey = serviceMapping[revenuType];
          const regionKey = regionMapping[region];
  
          if (serviceKey && regionKey) {
              const functionName = `${serviceKey}${regionKey}`; // Exemple : getDetailActifDir7
              return (this.SuiviAbonneDetailsService as any)[functionName]?.bind(this.SuiviAbonneDetailsService) || null;
          }
  
          return null;
      }
    
    
    
    
    // ✅ Fonction pour afficher le modal
    private openModal(): void {
        const modalElement = document.getElementById('detailsModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    }
    
    
    
      
  startDate(startDate: any, endDate: any) {
    throw new Error('Method not implemented.');
  }
  endDate(startDate: any, endDate: any) {
    throw new Error('Method not implemented.');
  }

  
    

}
