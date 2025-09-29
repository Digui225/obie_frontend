import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private modeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  mode$ = this.modeSubject.asObservable();

  setMode(mode: 'light' | 'dark') {
    this.modeSubject.next(mode);
    document.body.setAttribute('data-layout-mode', mode);
  }

  get currentMode() {
    return this.modeSubject.value;
  }
}
