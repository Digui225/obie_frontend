import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';
import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';

interface Group {
  name: string;
  type: 'Indicateurs' | 'Axes d analyse';
}

@Component({
  selector: 'app-select-indic-energie',
  templateUrl: './select-indic-energie.component.html',
  styleUrls: ['./select-indic-energie.component.scss']
})
export class SelectIndicEnergieComponent {

  [x: string]: any;
  @ViewChild('axesSelect') axesSelect!: NgSelectComponent;

  constructor(public ApiTableConfigService: ApiTableConfigService,
         public dateRangeService: DateRangeService,
          //public service: AbonneService,
         public faitSuiviEnergieService: FaitSuiviEnergieService,
          private dataSharingService: DataSharingService
    
          ) {}

    ngOnInit(): void {
  // Dates par défaut
  const defaultStartDate = '2020-02-01';
  const defaultEndDate = '2020-03-30';
  this.dateRangeService.setStartDate(defaultStartDate);
  this.dateRangeService.setEndDate(defaultEndDate);

  // Initialisation des indicateurs et axes
  this.indicateurs = this.Groups.filter(item => item.type === 'Indicateurs');
  this.axes = this.Groups.filter(item => item.type === 'Axes d analyse');

  this.filteredIndicateurs = this.indicateurs;
  this.filteredAxes = this.axes;

  // Sélection auto d’un indicateur
  this.selectedIndicateurs = this.filteredIndicateurs.length > 0 ? [this.filteredIndicateurs[0].name] : [];
  this.dataSharingService.setSelectedIndicateurs(this.selectedIndicateurs);

  // Affichage des axes si indicateur sélectionné
  this.showAxes = this.selectedIndicateurs.length > 0;

  // Sélection auto d’un axe
  this.selectedAxes = this.filteredAxes.length > 0 ? [this.filteredAxes[0].name] : [];
  this.dataSharingService.setSelectedAxes(this.selectedAxes);
}


  showCard : boolean = false;
   @Output() resultsFetched = new EventEmitter<any>(); // Permet d'envoyer les résultats au parent

   indicateurs: Group[] = [];
    axes: Group[] = [];

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

  filteredAxes: Group[] = [];
  filteredIndicateurs: Group[] = this.Groups.filter(g => g.type === 'Indicateurs');

  selectedIndicateurs: string[] = [];
  selectedAxes: string[] = [];
  showAxes = false;
  
       onSelect(groups: Group[]): void {
    this.selectedIndicateurs = groups.filter(g => g.type === 'Indicateurs').map(g => g.name);
    this.showAxes = this.selectedIndicateurs.length > 0;

    if (this.showAxes) {
      this.filteredAxes = this.Groups.filter(g => g.type === 'Axes d analyse');
      if (this.selectedAxes.length === 0 && this.filteredAxes.length > 0) {
        this.selectedAxes = [this.filteredAxes[0].name];
      }
    } else {
      this.filteredAxes = [];
      this.selectedAxes = [];
    }

    this.dataSharingService.setSelectedIndicateurs(this.selectedIndicateurs);
    this.dataSharingService.setSelectedAxes(this.selectedAxes);
  }

  onSelectAxes(groups: Group[]): void {
    this.selectedAxes = groups.map(g => g.name);
    this.dataSharingService.setSelectedAxes(this.selectedAxes);
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateRangeService.setStartDate(input.value);
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateRangeService.setEndDate(input.value);
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

  fetchData(): void {
  const startDate = this.dateRangeService.getStartDate();
  const endDate = this.dateRangeService.getEndDate();

  // Vérification des dates
  if (!startDate || !endDate) {
    alert("Veuillez sélectionner une date de début et une date de fin.");
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) {
    alert("La date de fin doit être supérieure à la date de début.");
    return;
  }

  // Vérification sélections
  if (!this.selectedIndicateurs?.length) {
    alert("Veuillez sélectionner au moins un indicateur.");
    return;
  }

  if (!this.selectedAxes?.length) {
    alert("Veuillez sélectionner au moins un axe d'analyse.");
    return;
  }

  // Normalisation
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

    this.faitSuiviEnergieService.getEnergieData(normalizedIndicateur, normalizedAxe, startDate, endDate)
      .subscribe({
        next: (data: [string, number][]) => {
          console.log(`Résultats obtenus pour ${axe}:`, data);

          this.showCard = true;
          this.dataSharingService.updateData(data);

          // Génération du resultType
          const resultType = `${normalizedIndicateur} - ${normalizedAxe}`;

          // ⚡️ Emit pour le parent
          this.resultsFetched.emit({
            data,
            resultType,
            showCard: true
          });
        },
        error: (err) => {
          console.error(`Erreur lors de la récupération des données pour ${axe}:`, err);
          alert("Erreur lors de la récupération des données.");
          this.showCard = false;
        }
      });

  } else {
    alert("Aucun indicateur ou axe valide n’a été sélectionné.");
  }
}

}
