 /* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { DashboardComponent } from './pages/dashboards/dashboard/dashboard.component';
import { AbonneComponent } from './pages/dashboards/abonne/abonne.component';
import { EnergieComponent } from './pages/dashboards/energie/energie.component';
import { RevenuComponent } from './pages/dashboards/revenu/revenu.component';
import { SollicitationComponent } from './pages/dashboards/sollicitation/sollicitation.component';
import { Landing2Component } from './pages/landing2/landing2.component';
import { GraphePersoComponent } from './pages/graphe-perso/graphe-perso.component';
import { AuthComponent } from './account/auth/auth.component';

import { LocalAuthGuard } from './core/guards/local-auth.guard'; // 👈 à créer
import { CleanUrlGuard } from './core/guards/clean-url.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  { path: 'landing2', component: Landing2Component, canActivate: [LocalAuthGuard] },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [LocalAuthGuard] },
      { path: 'abonne', component: AbonneComponent, canActivate: [LocalAuthGuard] },
      { path: 'revenu', component: RevenuComponent, canActivate: [LocalAuthGuard] },
      { path: 'energie', component: EnergieComponent, canActivate: [LocalAuthGuard] },
      { path: 'sollicitation', component: SollicitationComponent, canActivate: [LocalAuthGuard] },
      {path: 'creation', component: GraphePersoComponent, canActivate: [LocalAuthGuard]}
    ],
  },

  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}  */



// A DECOMMENTER POUR UTILISER KEYCLOAK
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { DashboardComponent } from './pages/dashboards/dashboard/dashboard.component';
import { AbonneComponent } from './pages/dashboards/abonne/abonne.component';
import { EnergieComponent } from './pages/dashboards/energie/energie.component';
import { RevenuComponent } from './pages/dashboards/revenu/revenu.component';
import { SollicitationComponent } from './pages/dashboards/sollicitation/sollicitation.component';
import { Landing2Component } from './pages/landing2/landing2.component';
import { GraphePersoComponent } from './pages/graphe-perso/graphe-perso.component';

import { AuthkeycloakGuard } from './core/guards/authkeycloak.guard';
import { CleanUrlGuard } from './core/guards/clean-url.guard';

const routes: Routes = [
  // root => redirection automatique vers landing
  {
    path: '',
    redirectTo: 'landing2',
    pathMatch: 'full',
    
  },

    { path: 'landing2', component: Landing2Component, canActivate: [CleanUrlGuard, AuthkeycloakGuard] },


 

  // layout principal
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [CleanUrlGuard, AuthkeycloakGuard], // 🔹 CleanUrlGuard remis ici
      },
      {
        path: 'abonne',
        component: AbonneComponent,
        canActivate: [CleanUrlGuard, AuthkeycloakGuard],
      },
      {
        path: 'revenu',
        component: RevenuComponent,
        canActivate: [CleanUrlGuard, AuthkeycloakGuard],
      },
      {
        path: 'energie',
        component: EnergieComponent,
        canActivate: [CleanUrlGuard, AuthkeycloakGuard],
      },
      {
        path: 'sollicitation',
        component: SollicitationComponent,
        canActivate: [CleanUrlGuard, AuthkeycloakGuard],
      },
      {path: 'creation',
       component: GraphePersoComponent,
        canActivate: [CleanUrlGuard, AuthkeycloakGuard]}

    ],
  },

  { path: '**', redirectTo: 'landing2' },
  // lazy load auth
  {
    path: 'auth',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
];


  


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}  
 

/*
// Ton layout principal
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [CleanUrlGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [CleanUrlGuard]
      },
      {
        path: 'abonne',
        component: AbonneComponent,
        canActivate: [AuthkeycloakGuard],
      },
      {
        path: 'revenu',
        component: RevenuComponent,
        canActivate: [AuthkeycloakGuard],
      },
      {
        path: 'energie',
        component: EnergieComponent,
        canActivate: [AuthkeycloakGuard],
      },
      {
        path: 'sollicitation',
        component: SollicitationComponent,
        canActivate: [AuthkeycloakGuard],
      },
    ],
  },

  // Auth lazy load
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
];

*/

 /* // page d’atterrissage intermédiaire
  {
    path: 'landing2',
    loadChildren: () =>
      import('./pages/pages.module').then(m => m.PagesModule), // si tu veux lazy loader
    canActivate: [CleanUrlGuard,AuthkeycloakGuard] // tu peux aussi protéger directement
  }, */

