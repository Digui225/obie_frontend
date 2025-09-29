import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandingService } from 'src/app/core/services/landing.service';

interface AppLink {
  name: string;
  logo: string;
  route: string; // ou bien url externe si besoin
}
@Component({
  selector: 'app-landing2',
  templateUrl: './landing2.component.html',
  styleUrls: ['./landing2.component.scss']
})
export class Landing2Component {

    apps: AppLink[] = [
    { name: 'OBIE', logo: 'assets/images/cie-logo.png', route: '/dashboard' },
    { name: 'App 2', logo: 'assets/images/sodeci-logo.jpg', route: '/app2' },
    { name: 'App 3', logo: 'assets/images/logo-ciprel.png', route: '/app3' },
    { name: 'App 3', logo: 'assets/images/logo-awale.png', route: '/app4' }

  ];

  constructor(private router: Router,
      private landingService: LandingService
) {}

    ngOnInit(): void {
    console.log('✅ Landing2 affiché');
  }

  goTo(app: AppLink) {
    this.landingService.markLandingSeen();
    this.router.navigate([app.route]);
  }
}
