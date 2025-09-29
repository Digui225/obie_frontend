import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Composants
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { AbonneComponent } from './dashboards/abonne/abonne.component';
import { RevenuComponent } from './dashboards/revenu/revenu.component';
import { EnergieComponent } from './dashboards/energie/energie.component';
import { SollicitationComponent } from './dashboards/sollicitation/sollicitation.component';
import { Landing2Component } from './landing2/landing2.component';


import { AuthkeycloakGuard } from '../core/guards/authkeycloak.guard';
import { CleanUrlGuard } from '../core/guards/clean-url.guard';

const routes: Routes = [
  {
    path: 'landing2',
    component: Landing2Component,
    canActivate: [AuthkeycloakGuard, CleanUrlGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthkeycloakGuard],
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
  // tu peux ajouter d'autres pages secondaires ici
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
