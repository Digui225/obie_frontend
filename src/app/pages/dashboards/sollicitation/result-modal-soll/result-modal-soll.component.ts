import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-result-modal-soll',
  templateUrl: './result-modal-soll.component.html',
  styleUrls: ['./result-modal-soll.component.scss']
})
export class ResultModalSollComponent {
   @Input() results: any[] = [];
  @Input() resultType!: string;
  @Input() showCard: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log("📊 [ResultModalSoll] Modal ouvert");
    console.log("👉 Type de résultat:", this.resultType);
    console.log("👉 Données reçues:", this.results);

    if (!this.results || this.results.length === 0) {
      console.warn("⚠️ Aucune donnée disponible pour l’affichage !");
    }
  }

  close(): void {
    console.log("❌ [ResultModalSoll] Fermeture du modal");
    this.activeModal.close();
  }
}
