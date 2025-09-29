import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';

@Component({
  selector: 'app-afficher-abonne',
  templateUrl: './afficher-abonne.component.html',
  styleUrls: ['./afficher-abonne.component.scss']
})
export class AfficherAbonneComponent {
 /*  startDate: string = ''; 
  endDate: string = ''; 
  selectedIndicateurs: string[] = []; 
  selectedAxes: string[] = []; 
  results: [string, number][] = []; // Correction du type attendu
  isSubmitDisabled: boolean = false;

  constructor(
    private faitSuiviAbonneService: FaitSuiviAbonneService, 
    private dataSharingService: DataSharingService,
    private dateRangeService: DateRangeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startDate = this.dateRangeService.getStartDate() ?? ''; 
    this.endDate = this.dateRangeService.getEndDate() ?? '';

    this.selectedIndicateurs = this.dataSharingService.getSelectedIndicateurs() ?? [];
    this.selectedAxes = this.dataSharingService.getSelectedAxes() ?? [];

    this.dataSharingService.currentData.subscribe(data => {
      this.results = data; // Mise à jour des résultats via le service
    });

    if (this.selectedIndicateurs.length === 0) {
      alert("Veuillez sélectionner des indicateurs.");
    }
    if (this.selectedAxes.length === 0) {
      alert("Veuillez sélectionner des axes.");
    }
  }
  get formattedResults(): [string, number][] {
    return this.results.map(item => [item[1]]);
  }

  fetchData(): void {
    const startDate = this.startDate;
    const endDate = this.endDate;
  
    if (!startDate || !endDate) {
      alert("Veuillez sélectionner une date de début et une date de fin.");
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
  
    if (this.selectedIndicateurs.length === 0 || this.selectedAxes.length === 0) {
      alert("Veuillez sélectionner au moins un indicateur et un axe d'analyse.");
      return;
    }
  
    const indicateur = this.selectedIndicateurs[0];
    const axe = this.selectedAxes[0];
  
    this.faitSuiviAbonneService.getAbonneData(indicateur, axe, startDate, endDate).subscribe({
      next: (data: [string, number][]) => {
        console.log(`Données mises à jour pour ${axe}:`, data);
  
        // ✅ Conserver `[string, number][]` pour la transmission au service
        this.results = data;
  
        // Mise à jour du DataSharingService
        this.dataSharingService.updateData(this.results);
      },
      error: (err) => {
        console.error(`Erreur lors de la récupération des données pour ${axe}:`, err);
        alert("Une erreur est survenue lors de la mise à jour des données.");
      },
    });
  } */
  
  
}
