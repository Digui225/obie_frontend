import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result-modal-energie',
  templateUrl: './result-modal-energie.component.html',
  styleUrls: ['./result-modal-energie.component.scss']
})
export class ResultModalEnergieComponent implements OnInit {
  @Input() results: any[] = [];
  @Input() resultType!: string;
  @Input() showCard: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log("📊 [ResultModalEnergie] Modal ouvert");
    console.log("👉 Type de résultat:", this.resultType);
    console.log("👉 Données reçues:", this.results);

    if (!this.results || this.results.length === 0) {
      console.warn("⚠️ Aucune donnée disponible pour l’affichage !");
    }
  }

  close(): void {
    console.log("❌ [ResultModalEnergie] Fermeture du modal");
    this.activeModal.close();
  }
}
