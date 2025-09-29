import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CleanUrlGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUrl = state.url;

    if (currentUrl.includes('#iss=')) {
      const cleanedUrl = currentUrl.split('#')[0];

      // Si l’URL avant le hash existe et n’est pas root
      if (cleanedUrl && cleanedUrl !== '/') {
        this.router.navigateByUrl(cleanedUrl);
      } else {
        this.router.navigate(['/landing2']); // 🔹 redirige désormais vers landing
      }

      return false;
    }

    return true;
  }
}
