import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private pieChartData = new BehaviorSubject<[string, number][]>([]);
  currentData = this.pieChartData.asObservable();

  updateData(data: [string, number][]) {
    this.pieChartData.next(data);
  }

  getData(): [string, number][] {
    return this.pieChartData.getValue();
  }

  private selectedIndicateursSource = new BehaviorSubject<string[]>([]);
  private selectedAxesSource = new BehaviorSubject<string[]>([]);

  selectedIndicateurs$ = this.selectedIndicateursSource.asObservable();
  selectedAxes$ = this.selectedAxesSource.asObservable();

  setSelectedIndicateurs(indicateurs: string[]): void {
    this.selectedIndicateursSource.next(indicateurs);
  }

  setSelectedAxes(axes: string[]): void {
    this.selectedAxesSource.next(axes);
  }

  getSelectedIndicateurs(): string[] {
    return this.selectedIndicateursSource.getValue();
  }

  getSelectedAxes(): string[] {
    return this.selectedAxesSource.getValue();
  }
  
}
