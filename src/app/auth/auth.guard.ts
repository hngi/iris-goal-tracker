import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private utils: UtilService) {

  }

  canActivate(): boolean {
    if (this.user.isLoggedIn.getValue()) {
      return true;
    }

    this.utils.showToast({ title: 'You\'re not logged in :(', type: 'warning' });
    this.router.navigate(['/']);
    return false;
  }
}
