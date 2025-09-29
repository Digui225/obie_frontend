import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule} from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
// import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { JwtInterceptor } from './core/helpers/jwt-keycloak.interceptor';


// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';


export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

/* if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  FakeBackendInterceptor;
} */

  export function kcFactory(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          realm: environment.keycloakConfig.realm,
          clientId: environment.keycloakConfig.clientId,
          url: environment.keycloakConfig.url
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
          redirectUri: window.location.origin
        },
        loadUserProfileAtStartUp: true
      }).then(() => console.log('✅ Keycloak initialized'))
        .catch(err => console.error('❌ Keycloak init error:', err));
  }

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
    Ng2SearchPipeModule,
    KeycloakAngularModule

  ],
  providers: [
    {provide : APP_INITIALIZER, deps : [KeycloakService],useFactory : kcFactory, multi : true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function then(arg0: () => void) {
  throw new Error('Function not implemented.');
}

