import { Component, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';
import { SelectPeriodeModalComponent } from '../../select-periode-modal/select-periode-modal.component';
import { ResultModalAbonneComponent } from '../result-modal-abonne/result-modal-abonne.component';

interface Group {
  name: string;
  type: 'Indicateurs' | 'Axes d analyse';
}

@Component({
  selector: 'app-drag-drop-abonne',
  templateUrl: './drag-drop-abonne.component.html',
  styleUrls: ['./drag-drop-abonne.component.scss']
})
export class DragDropAbonneComponent {
  draggedIndicateur: string | null = null;
  draggedAxe: string | null = null;

  indicateurs: Group[] = [];
  axes: Group[] = [];
    Groups: Group[] = [
      { name: 'Abonnés actifs', type: 'Indicateurs' },
     /*  { name: 'Abonnés au forfait', type: 'Indicateurs' },
      { name: 'Abonnés facturés', type: 'Indicateurs' },
      { name: 'Abonnés résiliés', type: 'Indicateurs' }, 
            { name: 'Nombre de résiliations', type: 'Indicateurs' },
    */
      { name: 'Nombre total d\'abonnés', type: 'Indicateurs' },
      { name: 'Nombre de modification de puissance souscrite', type: 'Indicateurs' },
      { name: 'Nombre de suspension', type: 'Indicateurs' },
      { name: 'Type abonné', type: 'Axes d analyse' },
      { name: 'Mode de facturation', type: 'Axes d analyse' },
      { name: 'Segment abonné', type: 'Axes d analyse' },
      { name: 'Puissance souscrite', type: 'Axes d analyse' },
      { name: 'Produit', type: 'Axes d analyse' },
      { name: 'Direction', type: 'Axes d analyse' },
    ];

    selectedIndicateurs: string[] = [];
  selectedAxes: string[] = [];
  showCard = false;
  errorMessage: string | null = null;

  @Output() resultsFetched = new EventEmitter<any>();

    constructor(
        public ApiTableConfigService: ApiTableConfigService,
        public dateRangeService: DateRangeService,
        public faitSuiviAbonneService: FaitSuiviAbonneService,
        private dataSharingService: DataSharingService,
        private modalService: NgbModal
      ) {}

      ngOnInit(): void {
    this.indicateurs = this.Groups.filter(item => item.type === 'Indicateurs');
    this.axes = this.Groups.filter(item => item.type === 'Axes d analyse');
  }

  onDrop(event: CdkDragDrop<any>, type: 'indicateur' | 'axe') {
    const droppedItem = event.item.data;

    if (type === 'indicateur') this.draggedIndicateur = droppedItem.name;
    else this.draggedAxe = droppedItem.name;

    if (this.draggedIndicateur && this.draggedAxe) this.openPeriodModal();
  }

  openPeriodModal() {
    const modalRef = this.modalService.open(SelectPeriodeModalComponent, { centered: true });

    modalRef.result.then((result) => {
      if (result && result.startDate && result.endDate) {
        this.dateRangeService.setStartDate(result.startDate);
        this.dateRangeService.setEndDate(result.endDate);

        this.selectedIndicateurs = [this.draggedIndicateur!];
        this.selectedAxes = [this.draggedAxe!];

        this.fetchData();
      }
      this.resetDrag();
    }, () => this.resetDrag());
  }

  fetchData(): void {
      const startDate = this.dateRangeService.getStartDate();
      const endDate = this.dateRangeService.getEndDate();
  
      if (!startDate || !endDate) {
        this.errorMessage = "Veuillez sélectionner une date de début et une date de fin.";
        console.error("⛔ Aucune période sélectionnée.");
        this.showCard = false;
        return;
      }
  
      const indicateur = this.selectedIndicateurs[0];
      const axe = this.selectedAxes[0];
  
      if (!indicateur || !axe) {
        this.errorMessage = "Aucun indicateur ou axe valide n’a été sélectionné.";
        console.warn("⚠️ fetchData appelé sans sélection valide.");
        this.showCard = false;
        return;
      }
  
      console.log(`🚀 FetchData pour [${indicateur}] par [${axe}] entre ${startDate} et ${endDate}`);
  
      this.faitSuiviAbonneService.getAbonneData(indicateur, axe, startDate.toString(), endDate.toString())
        .subscribe({
          next: (data: [string, number][]) => {
            console.log(`✅ Résultats obtenus (${data.length} lignes) pour ${axe}:`, data);
  
            if (!data || data.length === 0) {
              this.errorMessage = "Aucune donnée disponible pour la période et la sélection choisies.";
              this.showCard = false;
              return;
            }
  
            this.errorMessage = null;
            this.showCard = true;
            this.dataSharingService.updateData(data);
  
            const resultType = `${indicateur} - ${axe}`;
  
            this.resultsFetched.emit({ data, resultType, showCard: true });
  
            const modalRef = this.modalService.open(ResultModalAbonneComponent, {
              size: 'xl',
              centered: true
            });
            modalRef.componentInstance.results = data;
            modalRef.componentInstance.resultType = resultType;
            modalRef.componentInstance.showCard = true;
          },
          error: (err) => {
            console.error(`⛔ Erreur pour ${axe}:`, err);
            this.errorMessage = "Erreur lors de la récupération des données.";
            this.showCard = false;
          }
        });
    }
  
    private resetDrag() {
      this.draggedIndicateur = null;
      this.draggedAxe = null;
      console.log("🔄 Reset des sélections drag.");
    }
}
