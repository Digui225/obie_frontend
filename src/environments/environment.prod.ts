/* export const environment = {
  production: true,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
}; */

export const environment = {
  production: true,
  apiUrl: '/api',  // passera par Nginx qui proxy vers Spring Boot (localhost:8080)
  keycloakConfig: {
    realm: 'OsisBi',
    clientId: 'obie-angular',
    url: 'http://192.168.10.81:8080'
  }
};


/* export const environment = {
  production: true,
  defaultauth: 'fackbackend', // You might want to update this to use your Spring Boot backend for authentication
  apiUrl: 'http://your-spring-boot-machine:8080/api', // Update with your Spring Boot app URL
  database: {
    host: 'your-postgres-machine',
    port: 5432,
    username: 'your-postgres-username',
    password: 'your-postgres-password',
    database: 'your-postgres-database'
  }
}; */