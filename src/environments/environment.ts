// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/* export const environment = {
  production: false,
  defaultauth: 'keycloak',  
  keycloakConfig: {
    url: 'http://server-vscode:8080/auth',
    realm: 'OsisBi',
    clientId: 'obie-rest-api'
    redirectAfterLogoutUrl: 'http://localhost:4200', // URL vers laquelle l'utilisateur sera redirigé après déconnexion
  },
   Suppression des configurations Firebase
}; */





export const environment = {
  production: false,
  apiUrl: '/api',  // redirigé par proxy.conf.json vers ton backend
  keycloakConfig: {
    realm: 'OsisBi',
    clientId: 'obie-angular',
    url: 'http://192.168.10.81:8080'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
