/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
    private startDate:  string | number | null = null;
    private endDate: string | number | null = null;

    setStartDate(date:  string | number): void {
        this.startDate = date;
      }
    
      getStartDate(): string | number | null {
        return this.startDate;
      }
    
      setEndDate(date: string | number): void {
        this.endDate = date;
      }
    
      getEndDate(): string | number | null {
        return this.endDate;
      }
}
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {

  private startDate: string | number | null = null;
  private endDate: string | number | null = null;

  /** Convertit n'importe quelle date → format yyyyMMdd */
  private normalize(date: any): string {
    if (!date) return '';

    // Déjà format yyyyMMdd
    if (/^\d{8}$/.test(date)) {
      return date;
    }

    // Format yyyy-MM-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date.replace(/-/g, '');
    }

    // Si c'est un objet Date
    if (date instanceof Date) {
      return date.toISOString().substring(0, 10).replace(/-/g, '');
    }

    // Flatpickr retourne un tableau [DateObj]
    if (Array.isArray(date) && date.length > 0 && date[0] instanceof Date) {
      return date[0].toISOString().substring(0, 10).replace(/-/g, '');
    }

    return date;
  }

  setStartDate(date: any): void {
    this.startDate = this.normalize(date);
  }

  getStartDate(): string | number | null {
    return this.startDate;
  }

  setEndDate(date: any): void {
    this.endDate = this.normalize(date);
  }

  getEndDate(): string | number | null {
    return this.endDate;
  }
}
