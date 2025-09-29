import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {

  private fromDate: NgbDateStruct;
  private toDate: NgbDateStruct;

  constructor() {
    this.fromDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: 1 };
    this.toDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  }

  getFromDate(): NgbDateStruct {
    return this.fromDate;
  }

  getToDate(): NgbDateStruct {
    return this.toDate;
  }

  setFromDate(fromDate: NgbDateStruct): void {
    this.fromDate = fromDate;
    this.checkDates();
  }

  setToDate(toDate: NgbDateStruct): void {
    this.toDate = toDate;
    this.checkDates();
  }

  private checkDates(): void {
    if (this.fromDate && this.toDate && this.fromDate.year > this.toDate.year ||
      this.fromDate.year === this.toDate.year && this.fromDate.month > this.toDate.month ||
      this.fromDate.year === this.toDate.year && this.fromDate.month === this.toDate.month && this.fromDate.day > this.toDate.day) {
      this.toDate = this.fromDate;
    }
    if (this.fromDate && this.toDate && this.toDate.year < this.fromDate.year ||
      this.toDate.year === this.fromDate.year && this.toDate.month < this.fromDate.month ||
      this.toDate.year === this.fromDate.year && this.toDate.month === this.fromDate.month && this.toDate.day < this.fromDate.day) {
      this.fromDate = this.toDate;
    }
  }
}