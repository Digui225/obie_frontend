import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { GlobalComponent } from "../../global-component"; // Importation de GlobalComponent
import { User } from '../models/auth.models';
import { KeycloakService } from 'keycloak-angular';
import { LandingService } from './landing.service';

const AUTH_API = GlobalComponent.AUTH_API;  // Utilisation de l'URL d'authentification de GlobalComponent
const JWT_TOKEN_KEY = 'token'; // La clé utilisée pour stocker le token dans localStorage

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthkeyService {

  public currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private keycloakService: KeycloakService,
  private landingService: LandingService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Getter pour accéder à la valeur actuelle de l'utilisateur
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get the current user from localStorage if available
   */
  private getUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  /**
   * Register the user (if needed for your backend)
   * @param email email
   * @param first_name first name
   * @param password password
   */
  register(email: string, first_name: string, password: string) {
    return this.http.post(AUTH_API + 'signup', {
      email,
      first_name,
      password
    }, httpOptions);
  }

  /**
   * Login the user with Keycloak
   * @param email email of the user
   * @param password password of the user
   */
  login(email: string, password: string): Observable<any> {
    return from(this.keycloakService.login()).pipe(
      map(() => {
        const keycloakInstance = this.keycloakService.getKeycloakInstance();
        if (keycloakInstance && keycloakInstance.token) {
          const user: User = {
            username: keycloakInstance.tokenParsed?.['preferred_username'] || '',
            email: keycloakInstance.tokenParsed?.['email'] || '',
            token: keycloakInstance.token
          };
          // Stocker l'utilisateur et le token dans localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));  // Utilisation de 'currentUser'
          localStorage.setItem(JWT_TOKEN_KEY, keycloakInstance.token); // Stockage du token dans localStorage
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  /**
   * Logout the user and clear data
   */
async logout() {
  // Nettoyage local
  localStorage.removeItem('currentUser');
  localStorage.removeItem(JWT_TOKEN_KEY);
  this.currentUserSubject.next(null);

  // Reset landing → l’utilisateur repassera par landing après reconnexion
  localStorage.removeItem('landingSeen');

  // Déconnexion Keycloak
  await this.keycloakService.logout(window.location.origin);
}


  /**
   * Reset password (this can be implemented with your backend if needed)
   * @param email email
   */
  resetPassword(email: string) {
    return this.http.post(AUTH_API + 'reset-password', { email }, httpOptions);
  }

  /**
   * Get the authenticated user details (from Keycloak)
   */
  getAuthenticatedUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }   

  /**
   * Retrieve the JWT token from localStorage
   */
  getJwtToken(): string | null {
    return localStorage.getItem(JWT_TOKEN_KEY);  // Récupérer le token JWT depuis localStorage
  }
}

