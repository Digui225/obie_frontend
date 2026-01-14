import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicchartComponent } from '../basicChart/basicChart.component';
// Date Format
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

// Data Get
import { recomendedjob, candidate } from '../abonne/data';
import { AbonneModel, candidateModel, Group } from '../abonne/abonne.model';
import { AbonneService } from '../abonne/abonne.service';
import { NgbdJobSortableHeader } from '../abonne/abonne-sortable.directive';

import { circle, latLng, tileLayer } from 'leaflet';
import { UntypedFormBuilder } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';
import { FaitSuiviSollService } from 'src/app/core/services/fait-suivi-soll.service';
import { ResultsFetchedPayload } from 'src/app/core/models/results-fetched-payload';
  
// Import pour CSV
  import { jsPDF } from 'jspdf';  // Import de jsPDF
  import 'jspdf-autotable';  // Import du plugin autoTable pour jsPDF
  import autoTable from 'jspdf-autotable';

  import * as XLSX from 'xlsx';  // Import pour Excel
  import { saveAs } from 'file-saver';
  
@Component({
  selector: 'app-sollicitation',
  templateUrl: './sollicitation.component.html',
  styleUrls: ['./sollicitation.component.scss']
})
export class SollicitationComponent implements OnInit {
  [x: string]: any;
    @ViewChild('axesSelect') axesSelect!: NgSelectComponent;
  

  // Propriétés explicites pour les dates
  startDate: Number | null = null;
  endDate: Number | null = null;
  loading: boolean = false; // Pour indiquer si les données sont en cours de chargement
  errorMessage: string | null = null; // Pour stocker les messages d'erreur
  showCard : boolean = false;

    selectedDate!: Date;

    isSubmitDisabled: boolean = false;  // Désactiver par défaut


    indicateurs: Group[] = [];
    axes: Group[] = [];
    abonnements: any[] = [];

    
  selectedIndicateurs: string[] = []; // Indicateurs sélectionnés
  selectedAxes: string[] = []; // Axes sélectionnés
  results: any[][] = []; // Tableau de paires [directionId, nombreAbonnesActifs]
  resultType: string = ''; // Identifie le type de résultat ('direction' ou 'typeAbonne')
  tableHeaders: string[] = [];

  tableConfig: any;


  // bread crumb items
  breadCrumbItems!: Array<{}>;

  basicRadialbarChart: any;
  candidatelist!: candidateModel[]
  followbtn: any = 1;
  followtxt: any = 'Follow';

  // Table data
  jobList!: Observable<AbonneModel[]>;
  total: Observable<number>;
  candidatedetail: any;

  

  constructor(public ApiTableConfigService: ApiTableConfigService,
        public dateRangeService: DateRangeService,
         public service: AbonneService,
         public faitSuiviSollService: FaitSuiviSollService,
         private dataSharingService: DataSharingService
   
         ) {
       this.jobList = service.countries$;
       this.total = service.total$;
     }

  ngOnInit(): void {

    


    // Initialiser des dates par défaut
    const defaultStartDate = '20200201'; // Exemple : 1er janvier 2025
    const defaultEndDate = '20200330'; // Exemple : 31 janvier 2025
    this.dateRangeService.setStartDate(defaultStartDate);
    this.dateRangeService.setEndDate(defaultEndDate);

    /**
       * BreadCrumb
       */
    this.breadCrumbItems = [
      { label: 'Domaines d affaires' },
      { label: 'Suivi Sollicitation', active: true },

      ];

    // Chart Color Data Get Function
    this._basicRadialbarChart('["--vz-success"]');

      /* this.indicateurs = this.Groups.filter(item => item.type === 'Indicateurs');
      this.axes = this.Groups.filter(item => item.type === 'Axes d analyse');

      /// Filtrage des groupes
      this.filteredIndicateurs = this.Groups.filter(group => group.type === 'Indicateurs');
      this.filteredAxes = this.Groups.filter(group => group.type === 'Axes d analyse');

      // Sélection automatique d’un indicateur
      this.selectedIndicateurs = this.filteredIndicateurs.length > 0 ? [this.filteredIndicateurs[0].name] : [];
      this.dataSharingService.setSelectedIndicateurs(this.selectedIndicateurs);

      // Affichage des axes si au moins un indicateur sélectionné
      this.showAxes = this.selectedIndicateurs.length > 0;

      // Sélection automatique d’un axe
      this.selectedAxes = this.filteredAxes.length > 0 ? [this.filteredAxes[0].name] : []; */
      this.dataSharingService.setSelectedAxes(this.selectedAxes);

      // Ouvrir axesSelect automatiquement
      setTimeout(() => {
        this.axesSelect?.open();
      }, 0);

    }

  // Chart Colors Set
  public getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
* TOTAL JOBS Chart
*/
  public _basicRadialbarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicRadialbarChart = {
      series: [95],
      chart: {
        type: 'radialBar',
        width: 105,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '70%'
          },
          track: {
            margin: 1
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              offsetY: 8,
            }
          }
        },
      },
      colors: colors,
    };
  }

  

  
       

       



    

   onResultsReceived(event: ResultsFetchedPayload) {
  console.log("Résultats reçus du composant enfant :", event);
  this.results = event.data;
  this.resultType = event.resultType;
  this.showCard = event.showCard;
}

  exportToPDF() {
    const doc = new jsPDF();
  
    // Ajouter un titre ou des informations générales
    doc.text('Rapport Détail', 10, 10);
  
    // Récupérer les en-têtes selon le type de résultat
    const headers = this['apiTableConfigService'].getTableHeaders(this.resultType);
    this.tableHeaders = headers;
    
    // Vérifier si des résultats existent
    if (this.results && this.results.length > 0) {
      autoTable(doc, {
        head: [headers], // Utiliser les en-têtes dynamiques
        body: this.results.map((item, index) => {
          const row: any[] = [index + 1]; // Ajouter le numéro de ligne
          headers.slice(1).forEach((_, colIndex) => {
            row.push(item[colIndex]); // Ajouter les valeurs des colonnes correspondantes
          });
          return row;
        }),
      });
    }
  
    // Sauvegarder le PDF
    doc.save('rapport_detail.pdf');
  }
  
  

// Méthode pour exporter en Excel
    exportToExcel(): void {
      if (!this.results || this.results.length === 0) {
        console.error('Aucune donnée à exporter.');
        return;
      }

      // Récupérer les en-têtes dynamiques
      const headers = this['apiTableConfigService'].getTableHeaders(this.resultType);
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
  
}

/* startVoiceRecognition(inputType: string) {
        const recognition = new (window as any).webkitSpeechRecognition() || new (window as any).SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.start();
      
        recognition.onresult = (event: any) => {
          let speechResult = event.results[0][0].transcript.trim().toLowerCase();
          console.log('Texte reconnu:', speechResult);
      
          // Convertir le mot reconnu pour gérer le singulier/pluriel
          let possibleMatches = this.convertToPluralOrSingular(speechResult);
      
          if (inputType === 'indicateurs') {
            // Filtrer les indicateurs correspondants
            this.filteredIndicateurs = this.indicateurs.filter(item => 
              possibleMatches.some(match => item.name.toLowerCase().includes(match))
            );
      
            // **Préremplir automatiquement le `ng-select`** s'il y a une correspondance unique
            if (this.filteredIndicateurs.length === 1) {
              this.selectedIndicateurs = [this.filteredIndicateurs[0].name]; 
            }
            
          } else if (inputType === 'axes') {
            // Filtrer les axes correspondants
            this.filteredAxes = this.axes.filter(item => 
              possibleMatches.some(match => item.name.toLowerCase().includes(match))
            );
      
            // **Préremplir automatiquement le `ng-select`** s'il y a une correspondance unique
            if (this.filteredAxes.length === 1) {
              this.selectedAxes = [this.filteredAxes[0].name];
            }
          }
        };
      
        recognition.onerror = (event: any) => {
          console.error('Erreur de reconnaissance vocale:', event.error);
        };
      }

      private convertToPluralOrSingular(word: string): string[] {
        let words = [word];
      
        // Cas les plus courants en français (règles de base)
        if (word.endsWith('s')) {
          words.push(word.slice(0, -1)); // Retire le "s" -> Pluriel vers Singulier
        } else {
          words.push(word + 's'); // Ajoute "s" -> Singulier vers Pluriel
        }
      
        // Cas particuliers à gérer manuellement
        const exceptions: { [key: string]: string } = {
          'cheval': 'chevaux',
          'travail': 'travaux',
          'journal': 'journaux',
          'oeil': 'yeux',
          'genou': 'genoux',
          'bijou': 'bijoux',
          'caillou': 'cailloux',
          'chou': 'choux',
          'hibou': 'hiboux',
          'joujou': 'joujoux',
          'pou': 'poux'
        };
      
        if (exceptions[word]) {
          words.push(exceptions[word]); // Ajoute le pluriel si c'est un mot spécial
        } else if (Object.values(exceptions).includes(word)) {
          // Si le mot est un pluriel connu, on ajoute le singulier
          words.push(Object.keys(exceptions).find(key => exceptions[key] === word)!);
        }
      
        return words;
      } */

/*// option seclect fin
  fetchData(): void {
    
    // Récupération des dates via le service DateRangeService
    const startDate = this.dateRangeService.getStartDate();
    const endDate = this.dateRangeService.getEndDate();
  
    // Validation des dates
    if (!startDate || !endDate) {
      console.error("Dates invalides :", { startDate, endDate });
      alert("Veuillez sélectionner une date de début et/ou une date de fin.");
      return;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (end <= start) {
      this.isSubmitDisabled = true;
      alert("La date de fin doit être supérieure à la date de début.");
      return;
    } else {
      this.isSubmitDisabled = false;
    }
  
    // Validation des champs sélectionnés
    if (!this.selectedIndicateurs || this.selectedIndicateurs.length === 0) {
      alert("Veuillez sélectionner au moins un indicateur.");
      return;
    }
  
    if (!this.selectedAxes || this.selectedAxes.length === 0) {
      alert("Veuillez sélectionner au moins un axe d'analyse.");
      return;
    }
  
    // Récupération des données via le service
    const indicateur = this.selectedIndicateurs.find(i =>
      [	 'Nombre de sollicitations clients',   
     'Taux de sollicitation résolues dans les délais',    
    'Taux de sollicitation résolues hors délais',    
     'Durée moyenne de résolution des sollicitations', ].includes(i)
    );
    const axe = this.selectedAxes.find(a =>
      ['Direction', 'Type abonné', 'Segment abonné', 'Puissance Souscrite', 'Produit'].includes(a)
    );
  
    if (indicateur && axe) {
      this.faitSuiviSollService.getAbonneData(indicateur, axe, startDate, endDate).subscribe({
        next: (data: [string, number][]) => {
          console.log(`Résultats obtenus pour ${axe}:`, data);
          alert(`Résultats obtenus pour ${axe}:\n${JSON.stringify(data)}`);
          this.results = data; // Stockage des résultats pour affichage
          this.dataSharingService.updateData(data); // Transmet les données au service
          this.resultType = `${indicateur} - ${axe}`.toLowerCase(); // Concaténation de l'indicateur et de l'axe
          console.log("Generated resultType:", this.resultType);

        // ✅ Appel du service avec le bon paramètre
        this.tableHeaders = this.ApiTableConfigService.getTableHeaders(this.resultType);
        console.log("Table Headers:", this.tableHeaders);
        },
        error: (err) => {
          console.error(`Erreur lors de la récupération des données pour ${axe}:`, err);
          alert(`Une erreur est survenue lors de la récupération des données pour ${axe}.`);
        },
      });
    } else {
      console.error('Aucun indicateur ou axe valide sélectionné.');
    } 
  }*/