import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecimalPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// 🔹 Modules utilitaires
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// 🔹 Traduction
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// 🔹 Intercepteurs
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
//import { JwtInterceptor } from './core/helpers/jwt.interceptor'; // ✅ décommenté
import { JwtInterceptor } from './core/helpers/jwt-keycloak.interceptor';

// 🔹 Keycloak
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakBearerInterceptor } from 'keycloak-angular';


// 🔹 Environnements
import { environment } from '../environments/environment';
// Loader pour ngx-translate
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const isKeycloakOn = environment.useKeycloak;

/* ➜  Factory Keycloak (inactive si useKeycloak = false) */
export function kcFactory(keycloak: KeycloakService) {
  return async () => {
    if (!isKeycloakOn) return;               // désactivé
    await keycloak.init({
      config: environment.keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        redirectUri: window.location.origin
      },
      loadUserProfileAtStartUp: true
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
    AccountModule,
    Ng2SearchPipeModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],

  providers: [
    /* 1. Keycloak initializer (ne fait rien si useKeycloak = false) */
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    },

    /* 2. Intercepteurs AUTH : un seul actif à la fois */
    ...(isKeycloakOn
      ? [{
          provide: HTTP_INTERCEPTORS,
          useClass: KeycloakBearerInterceptor, // fourni par keycloak-angular
          multi: true
        }]   // ici tu remettras le JwtInterceptor Keycloak quand tu voudras
      : [{
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
          }]),

    /* 3. Autres intercepteurs toujours actifs */
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },

    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }