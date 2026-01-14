import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
  console.log('🚀 AuthFake va appeler : users/authenticate', { email, password });

  return this.http.post<User>('users/authenticate', { email, password }).pipe( // ← 2. <User>
    tap(res => console.log('✅ Réponse brute reçue :', res)),
    map(user => {
      if (user && user.token) {
        localStorage.setItem('toast', 'true');
        localStorage.setItem('token', user.token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    })
  );
}

   /** Renvoie le token courant (abstrait le localStorage) */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** 🔐  Persiste un token reçu de l’extérieur (landing, query-param, dev…) */
  setExternalToken(token: string): void {
    localStorage.setItem('token', token);
    // on recrée un pseudo-user pour que currentUserValue ne soit plus null
    const fakeUser: User = { id: 1, email: 'dev@fake.com', token };
    localStorage.setItem('currentUser', JSON.stringify(fakeUser));
    this.currentUserSubject.next(fakeUser);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    console.trace('🚪 LOGOUT appelé depuis :');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('toast');
    this.currentUserSubject.next(null);
  }
}