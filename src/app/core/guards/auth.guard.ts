import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { KeycloakService } from 'keycloak-angular'; // Importation du service Keycloak

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private keycloakService: KeycloakService // Injection de Keycloak
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated = !!this.authenticationService.currentUser(); // Vérifie si l'utilisateur est connecté

        if (isAuthenticated) {
            return true;
        }

        // 🔥 Redirection vers Keycloak
        this.keycloakService.login({
            redirectUri: window.location.origin + state.url, // Redirige l'utilisateur après authentification
        });

        return false; // Bloque l'accès en attendant la connexion Keycloak
    }
}
