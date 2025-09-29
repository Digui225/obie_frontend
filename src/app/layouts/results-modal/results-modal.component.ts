import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.scss']
})
export class ResultsModalComponent implements OnInit, OnChanges {

  @Input() title: string = '';
  @Input() data: [string, number][] = [];   // tableau de tuples
  @Input() headers: string[] = [];          // nouveaux headers métier
  @Input() chartType: 'bar' | 'pie' = 'bar';

  chartLabels: string[] = [];
  chartData: number[] = [];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log("✅ ResultsModalComponent initialisé");
    console.log("📌 Titre reçu :", this.title);
    console.log("📥 Données reçues :", this.data);
    console.log("📊 Type de graphique :", this.chartType);
    console.log("📑 Headers reçus :", this.headers);

    this.prepareChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['headers']) {
      console.log("🔄 Données ou headers mis à jour :", changes);
      this.prepareChartData();
    }
  }

  prepareChartData() {
  if (!this.data || this.data.length === 0) {
    console.warn("⚠️ Aucune donnée à afficher dans le graphique");
    this.chartLabels = [];
    this.chartData = [];
    return;
  }

  // Si headers fournis, on les utilise, sinon fallback générique
  if (!this.headers || this.headers.length === 0) {
    this.headers = this.data[0].map((_, i) => `Colonne ${i + 1}`);
  }

  // La 1ʳᵉ colonne comme label, 2ᵉ comme valeur pour le graphique
  this.chartLabels = this.data.map(item => String(item[0]));
  this.chartData = this.data.map(item => Number(item[1]));

  console.log("📑 Headers utilisés :", this.headers);
  console.log("📊 Labels préparés :", this.chartLabels);
  console.log("📊 Valeurs préparées :", this.chartData);
}


  close() {
    console.log("🛑 Fermeture du modal");
    this.activeModal.dismiss();
  }
}
