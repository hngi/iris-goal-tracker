import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})

export class ResetTokenGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private utils: UtilService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = route.params.token;
    if (token) {
      this.router.navigate([`/home/${token}`]);
      return false;
    }
    this.router.navigate([`/home/`]);
    return false;
  }
}
