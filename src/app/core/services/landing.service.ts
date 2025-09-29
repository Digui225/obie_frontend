import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LandingService {
  private seenKey = 'landingSeen';

  markLandingSeen() {
    localStorage.setItem(this.seenKey, 'true');
  }

  hasSeenLanding(): boolean {
    return localStorage.getItem(this.seenKey) === 'true';
  }

  resetLanding() {
    localStorage.removeItem(this.seenKey);
  }
}
