import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicchartComponent } from '../basicChart/basicChart.component';
// Date Format
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

// Data Get
import { recomendedjob, candidate } from '../abonne/data';
import { AbonneModel, candidateModel, Group } from '../abonne/abonne.model';
import { AbonneService } from '../abonne/abonne.service';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';
import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';


import { NgbdJobSortableHeader } from '../abonne/abonne-sortable.directive';

import { circle, latLng, tileLayer } from 'leaflet';
import { UntypedFormBuilder } from '@angular/forms';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';

@Component({
  selector: 'app-energie',
  templateUrl: './energie.component.html',
  styleUrls: ['./energie.component.scss']
})
export class EnergieComponent implements OnInit{
  [x: string]: any;
  @ViewChild('axesSelect') axesSelect!: NgSelectComponent;
  
  
   // Propriétés explicites pour les dates
    startDate: string | null = null;
    endDate: string | null = null;
  
      selectedDate!: Date;
  
      isSubmitDisabled: boolean = false;  // Désactiver par défaut
  
      indicateurs: Group[] = [];
      axes: Group[] = [];
  
    selectedIndicateurs: string[] = []; // Indicateurs sélectionnés
    selectedAxes: string[] = []; // Axes sélectionnés
    results: any[][] = []; // Tableau de paires [directionId, nombreAbonnesActifs]
    resultType: string = ''; // Identifie le type de résultat ('direction' ou 'typeAbonne')
    tableHeaders: string[] = [];
  
    tableConfig: any;
    showCard : boolean = false;
  
  
  
    
    // bread crumb items
    breadCrumbItems!: Array<{}>;
  
    basicRadialbarChart: any;
    candidatelist!: candidateModel[]
    
  
    // Table data
    jobList!: Observable<AbonneModel[]>;
    total: Observable<number>;
    candidatedetail: any;
    
  
    constructor(public ApiTableConfigService: ApiTableConfigService,
       public dateRangeService: DateRangeService,
        public service: AbonneService,
       public faitSuiviEnergieService: FaitSuiviEnergieService,
        private dataSharingService: DataSharingService
  
        ) {
      this.jobList = service.countries$;
      this.total = service.total$;
    }

  ngOnInit(): void {


    // Initialiser des dates par défaut
    const defaultStartDate = '2020-02-01'; // Exemple : 1er janvier 2025
    const defaultEndDate = '2020-03-30'; // Exemple : 31 janvier 2025
    this.dateRangeService.setStartDate(defaultStartDate);
    this.dateRangeService.setEndDate(defaultEndDate);

    /**
       * BreadCrumb
       */
    this.breadCrumbItems = [
      { label: 'Domaines d affaires' },
      { label: 'Suivi Energie', active: true },

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
      this.selectedAxes = this.filteredAxes.length > 0 ? [this.filteredAxes[0].name] : [];
      this.dataSharingService.setSelectedAxes(this.selectedAxes); */

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

  
  
 

  /**
   * Option groups Select2
   */
   /* selectedGroup = 'Choisissez les indicateurs et axes d analyses à afficher';
   Groups: Group[] = [
    { name: 'Quantité KwH produite', type: 'Indicateurs' },
    { name: 'Quantité KwH livrée',  type: 'Indicateurs' },
    { name: 'Quantité KwH exportée',  type: 'Indicateurs' },
    { name: 'Quantité KwH consommée',  type: 'Indicateurs' },
    { name: 'Quantité KwH facturée',  type: 'Indicateurs' },
    { name: 'Quantité KwH redevance',  type: 'Indicateurs' },
    { name: 'Quantité KwH rechargée',  type: 'Indicateurs' },
    { name: 'Quantité KwH approvisionnée',  type: 'Indicateurs' },
    { name: 'Montant KwH rechargé',  type: 'Indicateurs' },
    { name: 'Montant KwH approvisionné',  type: 'Indicateurs' },
    { name: 'Solde abonné',  type: 'Indicateurs' },
    { name: 'Solde revendeur',  type: 'Indicateurs'},
    { name: 'Type abonné', type: 'Axes d analyse' },
    { name: 'Mode de facturation', type: 'Axes d analyse' },
    { name: 'Segment abonné', type: 'Axes d analyse' },
    { name: 'Puissance Souscrite', type: 'Axes d analyse' },
    { name: 'Produit', type: 'Axes d analyse' },
    { name: 'Direction', type: 'Axes d analyse' },
    
   ];


   // Déclare filteredAxes et filteredIndicateurs avec un type explicite
   filteredAxes: Group[] = [];
   filteredIndicateurs: Group[] = [];
   
   // Variable pour afficher uniquement les indicateurs au départ
   filteredGroups: Group[] = this.Groups.filter(group => group.type === 'Indicateurs');
   
   // Variable pour savoir si les axes doivent être affichés
   showAxes = false;

     // Gérer la sélection des éléments (indicateurs et axes)
     onSelect(groups: Group[]): void {
      // Mettre à jour les indicateurs sélectionnés
      this.selectedIndicateurs = groups.filter(group => group.type === 'Indicateurs').map(group => group.name);

       // Mise à jour du service de partage
      this.dataSharingService.setSelectedIndicateurs(this.selectedIndicateurs);

      // Afficher les axes si des indicateurs sont sélectionnés
      this.showAxes = this.selectedIndicateurs.length > 0;

      if (this.showAxes) {
        // Filtrer les axes
        this.filteredAxes = this.Groups.filter(group => group.type === 'Axes d analyse');

        // Définir un axe par défaut
        if (this.selectedAxes.length === 0 && this.filteredAxes.length > 0) {
          this.selectedAxes = [this.filteredAxes[4].name];
        }

        // Mise à jour du service de partage
        this.dataSharingService.setSelectedAxes(this.selectedAxes);

        // Ouvrir automatiquement la liste déroulante des axes
          setTimeout(() => {
            this.axesSelect.open();
          }, 0);
      } else {
        // Réinitialiser si aucun indicateur n'est sélectionné
        this.filteredAxes = [];
        this.selectedAxes = [];
        this.dataSharingService.setSelectedAxes([]); // Réinitialisation dans le service

      }
    }

  // Gérer la sélection des axes
  onSelectAxes(groups: Group[]): void {
    this.selectedAxes = groups.map(group => group.name);
    // Mise à jour du service de partage
    this.dataSharingService.setSelectedAxes(this.selectedAxes);
  }

     // Méthode pour filtrer les groupes selon le type (Indicateurs ou Axes)
     filterGroupsByType(type: string): Group[] {
       return this.Groups.filter(group => group.type === type);
     }

     onStartDateChange(event: Event): void {
       const input = event.target as HTMLInputElement; // Casting explicite
       const date = input.value;
       this.dateRangeService.setStartDate(date);
       console.log('Date de début mise à jour :', date);
     }
     
     onEndDateChange(event: Event): void {
       const input = event.target as HTMLInputElement; // Casting explicite
       const date = input.value;
       this.dateRangeService.setEndDate(date);
       console.log('Date de fin mise à jour :', date);
     }
     
   
     

       // Fonction pour formater les dates
       private formatDate(date: Date): string {
         return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
       }
       

       startVoiceRecognition(inputType: string) {
        navigator.mediaDevices.enumerateDevices().then(devices => {
          const hasMicrophone = devices.some(device => device.kind === 'audioinput');
          
          if (!hasMicrophone) {
            console.error('Aucun micro détecté.');
            return;
          }
      
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
              console.log('Micro autorisé');
              
              const recognition = new (window as any).webkitSpeechRecognition() || new (window as any).SpeechRecognition();
              recognition.lang = 'fr-FR';
              recognition.start();
      
              recognition.onresult = (event: any) => {
                let speechResult = event.results[0][0].transcript.trim().toLowerCase();
                console.log('Texte reconnu:', speechResult);
      
                let possibleMatches = this.convertToPluralOrSingular(speechResult);
      
                if (inputType === 'indicateurs') {
                  this.filteredIndicateurs = this.indicateurs.filter(item =>
                    possibleMatches.some(match => item.name.toLowerCase().includes(match))
                  );
      
                  if (this.filteredIndicateurs.length === 1) {
                    this.selectedIndicateurs = [this.filteredIndicateurs[0].name];
                  }
                } else if (inputType === 'axes') {
                  this.filteredAxes = this.axes.filter(item =>
                    possibleMatches.some(match => item.name.toLowerCase().includes(match))
                  );
      
                  if (this.filteredAxes.length === 1) {
                    this.selectedAxes = [this.filteredAxes[0].name];
                  }
                }
              };
      
              recognition.onerror = (event: any) => {
                console.error('Erreur de reconnaissance vocale:', event.error);
              };
            })
            .catch((error) => console.error('Erreur d’autorisation du micro:', error));
        });
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
      }


  // option seclect fin
      fetchData(): void {
        const startDate = this.dateRangeService.getStartDate();
        const endDate = this.dateRangeService.getEndDate();
      
        // Vérification des dates
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
      
        // Vérification des sélections utilisateur
        if (!this.selectedIndicateurs?.length) {
          alert("Veuillez sélectionner au moins un indicateur.");
          return;
        }
      
        if (!this.selectedAxes?.length) {
          alert("Veuillez sélectionner au moins un axe d'analyse.");
          return;
        }
      
        console.log('Indicateurs sélectionnés :', this.selectedIndicateurs);
        console.log('Axes sélectionnés :', this.selectedAxes);
      
        // Normalisation des chaînes pour correspondre aux clés du service
        const normalize = (s: string) => s.trim().toLowerCase();
      
        const indicateur = this.selectedIndicateurs.find(i =>
          [
            'quantité kwh produite',
            'quantité kwh livrée',
            'quantité kwh exportée',
            'quantité kwh consommée',
            'quantité kwh facturée',
            'quantité kwh en redevance',
            'quantité kwh rechargée',
            'quantité kwh approvisionnée',
            'montant kwh rechargé',
            'montant kwh approvisionné',
            'solde abonné',
            'solde revendeur',
          ].includes(normalize(i))
        );
      
        const axe = this.selectedAxes.find(a =>
          [
            'direction',
            'type abonné',
            'mode de facturation',
            'segment abonné',
            'puissance souscrite',
            'produit',
          ].includes(normalize(a))
        );
      
        if (indicateur && axe) {
          const normalizedIndicateur = normalize(indicateur);
          const normalizedAxe = normalize(axe);

          
      
          this.faitSuiviEnergieService.getEnergieData(normalizedIndicateur, normalizedAxe, startDate, endDate).subscribe({
            next: (data: [string, number][]) => {
              console.log(`Résultats obtenus pour ${axe}:`, data);
              //alert(`Résultats obtenus pour ${axe}:\n${JSON.stringify(data)}`);
              this.results = data;
              this.showCard = true; // Afficher la carte après les données chargées
              this.dataSharingService.updateData(data);
      
              this.resultType = `${normalizedIndicateur} - ${normalizedAxe}`;
              console.log("Generated resultType:", this.resultType);
      
              this.tableHeaders = this.ApiTableConfigService.getTableHeaders(this.resultType);
              console.log("Table Headers:", this.tableHeaders);


            },
            error: (err) => {
              console.error(`Erreur lors de la récupération des données pour ${axe}:`, err);
              alert(`Une erreur est survenue lors de la récupération des données pour ${axe}.`);
              this.showCard = false; // facultatif mais propre
            }
          });
        } else {
          console.error('Aucun indicateur ou axe valide sélectionné.', { indicateur, axe });
          alert('Aucun indicateur ou axe valide n’a été sélectionné.');
        }
      } */
      
      onResultsReceived(event: { data: any; resultType: string; showCard: boolean }) {
  console.log("Résultats reçus du composant enfant :", event);

  this.results = event.data;
  this.resultType = event.resultType;
  this.showCard = event.showCard;
}

  
}
