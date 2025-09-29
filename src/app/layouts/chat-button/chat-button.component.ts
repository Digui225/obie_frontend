import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';
import { SuiviAbonneDetailsService } from 'src/app/core/services/suivi-abonne-details.service';
import { SuiviEnergieDetailsService } from 'src/app/core/services/suivi-energie-details.service';
import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { ResultsModalComponent } from '../results-modal/results-modal.component';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent implements OnInit {

  showChat = false;  
  selectedIndex: number | null = null;
  result: any[] = []; 
  currentTask: string | null = null;
  loading = false; 
  showConfirmation = false;

  // Liste des questions
  questions = [
    "Analyse des abonnés actifs pour la Direction régionale Abidjan Centre ?",
    "Analyse de la quantite Kwh consommée par puissance souscrite ?",
    "Analyse des revenus générés par facture dans la direction de Yopougon ?",
    "Analyse des abonnés actifs par direction et produit ?",
    "Analyse des revenus totaux générés dans la direction de Cocody ?"
  ];

  constructor(
    private suiviAbonneService: SuiviAbonneDetailsService,
    private faitSuiviAbonneService: FaitSuiviAbonneService,
    private suiviEnergieService: SuiviEnergieDetailsService,
    private faitSuiviEnergieService: FaitSuiviEnergieService,
    public dateRangeService: DateRangeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log("✅ ChatButtonComponent initialisé");
  }

  toggleChat() {
    this.showChat = !this.showChat;
    this.showConfirmation = false;
    this.result = [];
    console.log(`🌀 toggleChat() => showChat = ${this.showChat}`);
  }

  handleTask(question: string, index: number) {
    this.currentTask = question;
    this.selectedIndex = index;
    this.showConfirmation = true;
    this.result = [];
    console.log(`📌 Question sélectionnée : ${question} (index ${index})`);
  }

  taskHandlers: { [key: string]: (start: string, end: string) => Observable<any> } = {
    //"Analyse des abonnés actifs pour la Direction régionale de Bouaké ?": (start, end) => 
      //this.suiviAbonneService.getDetailActif('Direction', '7', start, end),

    "Analyse de la quantite Kwh consommée par puissance souscrite ?": (start, end) =>
      this.faitSuiviEnergieService.getQteKwhConsoPs( start, end),

    "Analyse des revenus générés par facture dans la direction de Yopougon ?": (start, end) =>
      this.suiviAbonneService.getDetailFactureProd2(start, end),

    "Analyse des abonnés actifs par direction et produit ?": (start, end) =>
      this.faitSuiviAbonneService.getAbonneActifParDirProd(start, end),

    "Analyse des revenus totaux générés dans la direction de Cocody ?": (start, end) =>
      this.suiviAbonneService.getDetailFacturePs1(start, end)
  };

  confirm(answer: boolean) {
    console.log(`🔍 Validation : ${answer}`);
    if (!answer || !this.currentTask) {
      console.warn("⚠️ Aucune tâche sélectionnée ou validation annulée.");
      return;
    }

    const startDate = this.dateRangeService.getStartDate();
    const endDate = this.dateRangeService.getEndDate();
    console.log(`📅 Période sélectionnée : ${startDate} → ${endDate}`);

    if (!startDate || !endDate) {
      alert("Veuillez sélectionner une période valide.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      alert("La date de fin doit être supérieure à la date de début.");
      return;
    }

    this.loading = true;
    console.log(`⏳ Chargement des données pour "${this.currentTask}"`);

    const handler = this.taskHandlers[this.currentTask];
    if (handler) {
      handler(startDate, endDate).subscribe({
        next: (res) => {
          console.log("📥 Données API reçues :", res);
          this.result = res.data;        // uniquement les lignes
          const headers = res.headers;   // tes headers métiers
          this.loading = false;
          this.openModal(headers);       // passe-les si besoin
        },

        error: (err) => {
          console.error("❌ Erreur API :", err);
          alert("Erreur lors de la récupération des données.");
          this.loading = false;
        }
      });
    } else {
      console.error(`❌ Aucun handler trouvé pour la tâche : ${this.currentTask}`);
    }
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateRangeService.setStartDate(input.value);
    console.log(`📅 Date de début mise à jour : ${input.value}`);
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateRangeService.setEndDate(input.value);
    console.log(`📅 Date de fin mise à jour : ${input.value}`);
  }

  openModal(headers?: string[]) {
  const modalRef = this.modalService.open(ResultsModalComponent, { size: 'xl', scrollable: true });
  modalRef.componentInstance.title = this.currentTask || 'Résultats';
  modalRef.componentInstance.data = this.result;
  modalRef.componentInstance.headers = headers; // si tu veux afficher
}


  reset() {
    console.log("♻️ Reset du chat");
    this.currentTask = null;
    this.showChat = false;
    this.showConfirmation = false;
  }
}
