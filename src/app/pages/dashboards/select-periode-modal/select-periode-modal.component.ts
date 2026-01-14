import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeService } from 'src/app/core/services/date-range.service';

@Component({
  selector: 'app-select-periode-modal',
  templateUrl: './select-periode-modal.component.html',
  styleUrls: ['./select-periode-modal.component.scss']
})
export class SelectPeriodeModalComponent {
  start: string | null = null;
  end: string | null = null;

  constructor(public modal: NgbActiveModal, private dateRangeService: DateRangeService) {}

  dismiss(): void {
    this.modal.dismiss();
  }

  validate(): void {

    if (!this.start || !this.end) {
      console.error('❌ Dates invalides');
      return;
    }

    // 👉 mise à jour centralisée via DateRangeService
    this.dateRangeService.setStartDate(this.start);
    this.dateRangeService.setEndDate(this.end);

    console.log('📅 Nouvelle période enregistrée =', this.start, this.end);
    // On renvoie simplement les dates au parent
    this.modal.close({
      startDate: this.start,
      endDate: this.end
    });
  }
}
