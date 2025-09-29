import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { environment } from 'src/environments/environment';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
  }

  login(email: string, password: string) {
    return this.http.post(AUTH_API + 'signin', { email, password }, httpOptions);
  }

  public currentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  get currentUserValue() {
    return this.currentUser();
  } 

  getCurrentUser() {
    return this.http.get(`${environment.apiUrl}/v1/user/me`);
  }

  isLoggedIn(): Promise<boolean> {
  return this.keycloakService.isLoggedIn();
}

      /**
     * Charge le profil Keycloak et retourne le username
     */
        async loadUsernameFromKeycloak(): Promise<string | null> {
          try {
            const profile = await this.keycloakService.loadUserProfile();
            return profile.username ?? null;
          } catch (err) {
            console.error('Erreur lors du chargement du profil :', err);
            return null;
          }
        }


  // getKeycloakInstance() {
  //   return this.keycloakService.getKeycloakInstance();
  // }

  // async getUsername(): Promise<string | null> {
  //   try {
  //     const tokenParsed = this.getKeycloakInstance().tokenParsed;
  //     return tokenParsed?.['preferred_username'] ?? null;
  //   } catch (err) {
  //     console.error('Erreur lors du chargement du profil :', err);
  //     return null;
  //   }
  // }

  logout() {
    if (this.keycloakService) {
      this.keycloakService.logout(window.location.origin);
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
