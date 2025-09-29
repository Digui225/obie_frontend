/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingService } from 'src/app/core/services/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private landingService: LandingService
  ) {}

  ngOnInit(): void {
    console.log('[LandingComponent] ngOnInit called');
    console.log('[LandingComponent] hasSeenLanding:', this.landingService.hasSeenLanding());
  }

  goTo(path: string) {
    console.log('[LandingComponent] Navigating to:', path);
    this.landingService.setSeenLanding();
    this.router.navigate([path])
      .then(success => console.log('[LandingComponent] Navigation success:', success))
      .catch(err => console.error('[LandingComponent] Navigation error:', err));
  }
}
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private router: Router) {}
  goTo(path: string) {
    this.router.navigate([path]);
  }
}
