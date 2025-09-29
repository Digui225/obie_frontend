import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';

// Component Pages
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  
  {
    path: 'lockscreen', loadChildren: () => import('./auth/lockscreen/lockscreen.module').then(m => m.LockscreenModule)
  },
  {
    path: 'logout', loadChildren: () => import('./auth/logout/logout.module').then(m => m.LogoutModule)
  },
  {
    path: 'success-msg', loadChildren: () => import('./auth/success-msg/success-msg.module').then(m => m.SuccessMsgModule)
  },
  {
    path: 'errors', loadChildren: () => import('./auth/errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '*', component: 
    LoginComponent },
    // {path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterLink, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
