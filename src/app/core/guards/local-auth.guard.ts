 import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { LandingService } from '../services/landing.service';
import { LogoutSignal } from '../services/logoutSignal.service';

@Injectable({ providedIn: 'root' })
export class LocalAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthfakeauthenticationService,
    private landingService: LandingService,
    private logoutSignal: LogoutSignal
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /* 0️⃣  Sortie ultra-rapide si on vient de se déconnecter */
    if (this.logoutSignal.getLoggedOut()) {
      this.logoutSignal.setLoggedOut();          // reset
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    /* 1️⃣  Vérif classique */
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    /* 2️⃣  Landing rules */
    if (state.url === '/dashboard' && !this.landingService.hasSeenLanding()) {
      this.router.navigate(['/landing2'], { replaceUrl: true });
      return false;
    }

    if (state.url === '/landing2' && this.landingService.hasSeenLanding()) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
      return false;
    }

    return true;
  }
}

/* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.group('🔍 LocalAuthGuard Debug');
    
    // Récupère le token DIRECTEMENT
    const token = localStorage.getItem('token');
    console.log('1. Token brut:', token);
    
    // Vérifie que le token existe et est valide
    if (!token || token === 'null' || token === 'undefined') {
      console.log('2. ❌ PAS DE TOKEN → REDIRECTION LOGIN');
      this.router.navigate(['/login']);
      console.groupEnd();
      return false;
    }

    // 🔹 IMPORTANT : Sauvegarde le currentUser S'IL EST NULL
    if (!this.authService.currentUserValue) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        console.log('3. 🔄 Restauration currentUser depuis localStorage');
        const user = JSON.parse(storedUser);
        this.authService['currentUserSubject'].next(user); // Force la restauration
      }
    }

    // 🔹 Vérifie le landing SEULEMENT si on accède à /dashboard pour la première fois
    if (state.url === '/dashboard' && !this.landingService.hasSeenLanding()) {
      console.log('4. 🆕 PREMIERE CONNEXION → LANDING2');
      this.router.navigate(['/landing2']);
      console.groupEnd();
      return false;
    }

    console.log('5. ✅ ACCES AUTORISE');
    console.groupEnd();
    return true;
  } */ 