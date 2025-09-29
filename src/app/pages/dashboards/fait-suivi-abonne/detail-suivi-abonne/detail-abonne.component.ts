import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var bootstrap: any; // ⚡ nécessaire si tu utilises Bootstrap modal

@Component({
  selector: 'app-detail-abonne',
  templateUrl: './detail-abonne.component.html',
  styleUrls: ['./detail-abonne.component.scss']
})
export class DetailAbonneComponent {
  @Input() details: any[] = []; // Données des abonnés récupérées
  @Input() tableHeaders: string[] = [];

  @Output() exportData = new EventEmitter<any[]>(); // Permet d'envoyer les données au parent


  // ➡️ Pour gérer la pagination :
  currentPage: number = 1; 
  itemsPerPage: number = 10; 

  // ➡️ Pour la carte abonné
  selectedAbonne: any = null;

  ngOnChanges() {
    console.log("Nombre réel d’éléments reçus :", this.details?.length);
  }

  notifyParentForExport() {
    this.exportData.emit(this.details);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ➡️ Ouvrir la carte abonné dans un modal
  openCarte(detail: any) {
    this.selectedAbonne = {
      codeAbonne: detail[0],
      nomPrenom: detail[1],
      statut: detail[2],
      contact: '01010101',
      adresse: 'Abidjan',
      numCompteur: 'CPT12345',
      numTelephone: '07070707',
      puissance: '6 kVA',
      segment: 'Résidentiel',
      sexe: 'H'
    };

    const modal = new bootstrap.Modal(document.getElementById('carteModal'));
    modal.show();
  }
}
