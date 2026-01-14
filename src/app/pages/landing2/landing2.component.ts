import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingService } from 'src/app/core/services/landing.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

interface AppLink {
  name: string;
  logo: string;
  route: string;
}

@Component({
  selector: 'app-landing2',
  templateUrl: './landing2.component.html',
  styleUrls: ['./landing2.component.scss']
})
export class Landing2Component implements OnInit {

  apps: AppLink[] = [
    { name: 'OBIE', logo: 'assets/images/cie-logo.png', route: '/dashboard' },
    { name: 'App 2', logo: 'assets/images/sodeci-logo.jpg', route: '/app2' },
    { name: 'App 3', logo: 'assets/images/logo-ciprel.png', route: '/app3' },
    { name: 'App 3', logo: 'assets/images/logo-awale.png', route: '/app4' }
  ];

  constructor(
    private router: Router,
    private landingService: LandingService,
    private authService: AuthfakeauthenticationService
  ) {}

  ngOnInit(): void {
    console.log('✅ Landing2 affiché');

    // 1.  Marque la landing comme vue
    this.landingService.markLandingSeen();

    // 2.  Sauvegarde le token (ou le fake dev) pour qu’il survive au reload
    const usedToken = localStorage.getItem('token') || 'fake-jwt-token';
    this.authService.setExternalToken(usedToken);
  }

  goTo(app: AppLink) {
    console.log('🚀 Navigation vers:', app.route);
    this.router.navigate([app.route]);
  }
}