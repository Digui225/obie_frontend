import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class LogoutSignal {
  private justLoggedOut = false;

  setLoggedOut() {
    this.justLoggedOut = true;
    setTimeout(() => this.justLoggedOut = false, 1000); // auto-reset
  }

  getLoggedOut() {
    return this.justLoggedOut;
  }
}