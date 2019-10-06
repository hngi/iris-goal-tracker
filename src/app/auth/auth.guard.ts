import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private user: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    // console.log(route.params);
    return new Promise(resolve => {
      return resolve(this.user.isLoggedIn.getValue());
    });
  }
}
