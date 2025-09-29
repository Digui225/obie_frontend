import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
    private startDate: string | null = null;
    private endDate: string | null = null;

    setStartDate(date: string): void {
        this.startDate = date;
      }
    
      getStartDate(): string | null {
        return this.startDate;
      }
    
      setEndDate(date: string): void {
        this.endDate = date;
      }
    
      getEndDate(): string | null {
        return this.endDate;
      }
}
