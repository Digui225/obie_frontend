import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';
import { KeycloakService } from 'keycloak-angular';
import { LandingService } from './landing.service';
import { LogoutSignal } from './logoutSignal.service';

const AUTH_API = GlobalComponent.AUTH_API;
const JWT_TOKEN_KEY = 'token';
const USER_KEY = 'currentUser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthkeyService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
    private landingService: LandingService,
    private logoutSignal: LogoutSignal
  ) {

    // ❗ Mode Keycloak → user = null au démarrage, pas de localStorage.
    // ❗ Mode local → on recharge depuis localStorage.
    const storedUser = !environment.useKeycloak
      ? this.getUserFromLocalStorage()
      : null;

    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /** ---------------------- MODE LOCAL STORAGE (No Keycloak) ---------------------- */
  private getUserFromLocalStorage(): User | null {
    if (environment.useKeycloak) return null;
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  /** Utilisé seulement en mode SANS Keycloak */
  loginLocal(email: string, password: string) {
    return this.http.post<any>(AUTH_API + 'signin', { email, password }, httpOptions)
      .pipe(
        map(res => {
          if (res?.token) {
            const user: User = {
              username: res.username,
              email: res.email,
              token: res.token
            };

            localStorage.setItem(USER_KEY, JSON.stringify(user));
            localStorage.setItem(JWT_TOKEN_KEY, res.token);

            this.currentUserSubject.next(user);
          }
          return res;
        })
      );
  }

  /** ---------------------- MODE KEYCLOAK ---------------------- */
  login(): Observable<any> {
    if (!environment.useKeycloak) {
      throw new Error("❌ login() appelé alors que Keycloak est OFF. Utilise loginLocal().");
    }

    return from(this.keycloakService.login()).pipe(
      map(() => {
        const kc = this.keycloakService.getKeycloakInstance();

        if (kc?.token) {
          const user: User = {
            username: kc.tokenParsed?.['preferred_username'] || '',
            email: kc.tokenParsed?.['email'] || '',
            token: kc.token
          };

          // 🔥 Mode Keycloak : ON STOCKE PAS LE TOKEN !
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  /** ---------------------- LOGOUT ---------------------- */
  async logout() {
    // 🔥 Toujours reset landing
    localStorage.removeItem('landingSeen');

    if (environment.useKeycloak) {
      // 🔹 Keycloak gère tout
      this.currentUserSubject.next(null);
      await this.keycloakService.logout(window.location.origin);
      this.logoutSignal.setLoggedOut(); // ← ajoute cette ligne
      return;
    }

    // 🔹 Mode local → nettoyage manuel
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(JWT_TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.logoutSignal.setLoggedOut(); // ← ajoute cette ligne

  }

  /** ---------------------- EXTRA ---------------------- */
  resetPassword(email: string) {
    return this.http.post(AUTH_API + 'reset-password', { email }, httpOptions);
  }

  getAuthenticatedUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  /** Récupération token → utile seulement quand Keycloak = false */
  getJwtToken(): string | null {
    return environment.useKeycloak ? null : localStorage.getItem(JWT_TOKEN_KEY);
  }
}
