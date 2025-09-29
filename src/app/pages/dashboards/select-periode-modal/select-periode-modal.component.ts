import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-periode-modal',
  templateUrl: './select-periode-modal.component.html',
  styleUrls: ['./select-periode-modal.component.scss']
})
export class SelectPeriodeModalComponent {
  start: string | null = null;
  end: string | null = null;

  constructor(public modal: NgbActiveModal) {}

  dismiss(): void {
    this.modal.dismiss();
  }

  validate(): void {
    // On renvoie simplement les dates au parent
    this.modal.close({
      startDate: this.start,
      endDate: this.end
    });
  }
}
