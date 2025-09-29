/* import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { LandingService } from '../services/landing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthkeycloakGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private landingService: LandingService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    console.log('[AuthkeycloakGuard] Checking access for URL:', state.url);
    console.log('[AuthkeycloakGuard] Authenticated:', this.authenticated);

    if (!this.authenticated) {
      console.log('[AuthkeycloakGuard] User not authenticated, redirecting to login...');
      await this.keycloak.login({
      redirectUri: window.location.origin 
      });
    }

    // ⚡ Si utilisateur n’a pas encore vu landing → redirige sauf si déjà dessus
    if (!this.landingService.hasSeenLanding() && state.url !== '/landing2') {
      this.router.navigate(['/landing2']);
      return false;
    }

    const requiredRoles = route.data['roles'];
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      console.log('[AuthkeycloakGuard] No roles required, access allowed');
      return true;
    }

    const allowed = requiredRoles.every((role) => this.roles.includes(role));
    console.log('[AuthkeycloakGuard] Roles required:', requiredRoles, 'User roles:', this.roles, 'Access allowed:', allowed);
    return allowed;
  }
}
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { LandingService } from '../services/landing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthkeycloakGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private landingService: LandingService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    console.log('[AuthkeycloakGuard] Checking access for URL:', state.url);
    console.log('[AuthkeycloakGuard] Authenticated:', this.authenticated);

    // 🔹 Si non authentifié → redirige login
    if (!this.authenticated) {
      console.log('[AuthkeycloakGuard] User not authenticated, redirecting to login...');
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url // conserve la page demandée
      });
      return false;
    }

    // 🔹 Premier login → redirige vers landing2, mais seulement si on est à la racine ou dashboard
    if (!this.landingService.hasSeenLanding() 
        && state.url !== '/landing2'
        && (state.url === '/' || state.url === '/dashboard')) {
      console.log('[AuthkeycloakGuard] Redirecting to landing2...');
      this.router.navigate(['/landing2']);
      return false;
    }

    // 🔹 Vérification des rôles (si définis dans les routes)
    const requiredRoles = route.data['roles'];
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      console.log('[AuthkeycloakGuard] No roles required, access allowed');
      return true;
    }

    const allowed = requiredRoles.every((role) => this.roles.includes(role));
    console.log('[AuthkeycloakGuard] Roles required:', requiredRoles, 'User roles:', this.roles, 'Access allowed:', allowed);
    return allowed;
  }
}
