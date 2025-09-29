import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-energie',
  templateUrl: './detail-energie.component.html',
  styleUrls: ['./detail-energie.component.scss']
})
export class DetailEnergieComponent {

  @Input() details: any[] = []; // Données des abonnés récupérées
  @Input() tableHeaders: string[] = [];

  @Output() exportData = new EventEmitter<any[]>(); // Permet d'envoyer les données au parent

   // ➡️ Pour gérer la pagination :
   currentPage: number = 1; // Page actuelle
   itemsPerPage: number = 10; // Nombre d'éléments par page

   ngOnChanges() {
    console.log("Nombre réel d’éléments reçus :", this.details?.length);
  }
  

  notifyParentForExport() {
    this.exportData.emit(this.details); // Envoie les détails au parent
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // remonte en haut au changement de page
  }
  
}
