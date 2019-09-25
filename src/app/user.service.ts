import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) { }

  login(user: { email: string, password: string }) {
    return this.api.post('users/login', user);
  }

  register(user: { name: string, email: string, password: string }) {
    return this.api.post('users', user);
  }

  verify(token: string) {
    return this.api.post('users/verify', { token });
  }

  saveUser(user: any) {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  getUserObj() {
    return JSON.parse(localStorage.getItem('user'));
  }

  removeUser() {
    return localStorage.removeItem('user');
  }
}
