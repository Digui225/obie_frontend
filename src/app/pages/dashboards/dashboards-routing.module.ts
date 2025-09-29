import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AbonneComponent } from "./abonne/abonne.component";
import { AfficherAbonneComponent } from './abonne/afficher-abonne/afficher-abonne.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnergieComponent } from './energie/energie.component';
import { RevenuComponent } from './revenu/revenu.component';
import { SollicitationComponent } from './sollicitation/sollicitation.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "abonne",
    component: AbonneComponent
  },
  {
    path: "revenu",
    component: RevenuComponent
  },
  {
    path: "energie",
    component: EnergieComponent
  },
  {
    path: "sollicitation",
    component: SollicitationComponent
  },
  {
    path: "redirectAbs",
    component: AfficherAbonneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
