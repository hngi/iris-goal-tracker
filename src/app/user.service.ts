import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public passwordReset: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private api: ApiService) {
    this.isLoggedIn.next(Boolean(this.getUserObj()));
  }

  get apiUrlBase(): string {
    return this.api.url;
  }

  login(user: { email: string, password: string }) {
    return this.api.post('users/login', user);
  }

  register(user: { name: string, email: string, password: string }) {
    return this.api.post('users', user);
  }

  verify(token: string) {
    return this.api.post('users/verify', { token });
  }

  forgotPassword(formData: any) {
    return this.api.post('users/forgot-password', formData);
  }

  resetPassword(formData: any) {
    return this.api.post('users/reset-password', formData);
  }

  uploadProfileImage(user: string, formData: any) {
    const headers = this.getAuthHeader();
    return this.api.post(`users/uploads/image/${user}`, formData, { headers });
  }

  logout() {
    this.removeUser();
    this.isLoggedIn.next(false);
  }

  getLoggedInStatus() {
    return this.isLoggedIn.asObservable();
  }

  getPasswordResetStatus() {
    return this.passwordReset.asObservable();
  }

  triggerPasswordResetComplete() {
    this.passwordReset.next(true);
  }

  saveUser(user: any, triggerLoggedIn: boolean = false) {
    if (triggerLoggedIn) {
      this.isLoggedIn.next(true);
    }
    return localStorage.setItem('user', JSON.stringify(user));
  }

  handleContact(data: any) {
    return this.api.post('feedbacks', data);
  }

  getUserObj() {
    const user = localStorage.getItem('user');
    return user || user === 'undefined' ? JSON.parse(user) : undefined;
  }

  updateUser(id: string, data: any) {
    const headers = this.getAuthHeader();
    return this.api.put(`users/${id}`, data, { headers });
  }

  removeUser() {
    return localStorage.removeItem('user');
  }


  /* Goals */
  createGoal(goal: { title: string, author: string, description?: string }) {
    const { _id, token } = this.getUserObj();
    const headers = this.getAuthHeader(token);
    goal.author = _id;
    return this.api.post('goals', goal, { headers });
  }

  getGoals() {
    const { _id, token } = this.getUserObj();
    const headers = this.getAuthHeader(token);
    return this.api.get(`goals/author/${_id}`, null, { headers });
  }

  getSingleGoal(id: string) {
    const headers = this.getAuthHeader();
    return this.api.get(`goals/${id}`, null, { headers });
  }

  updateGoal(id: string, data: any) {
    const headers = this.getAuthHeader();
    return this.api.put(`goals/${id}`, data, { headers });
  }

  removeGoal(id: string) {
    const headers = this.getAuthHeader();
    return this.api.delete(`goals/${id}`, { headers });
  }

  /* Todos */
  createTodo(goal: string, todo: { title: string, goal?: string, description?: string }) {
    const headers = this.getAuthHeader();
    todo.goal = goal;
    return this.api.post('todos', todo, { headers });
  }

  removeTodo(todo: string) {
    const headers = this.getAuthHeader();
    return this.api.delete('todos/' + todo, { headers });
  }

  markTodo(id: string, isComplete: boolean) {
    const headers = this.getAuthHeader();
    return this.api.put(`todos/${id}`, { isComplete }, { headers });
  }

  private getAuthHeader(token?: string) {
    if (!token) {
      token = this.getUserObj().token;
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  public getAvatarInitials(text: string) {
    const initials = text ?
      `${text.split(' ')[0] ? text.split(' ')[0][0] : ''}${text.split(' ')[1] ? text.split(' ')[1][0] : ''}`
        .toUpperCase() : '!';
    const color = this.stringToHslColor(text || '!', 65, 70);
    return { initials, color };
  }

  private stringToHslColor(text: string, saturation: number, lightness: number) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return 'hsl(' + h + ', ' + saturation + '%, ' + lightness + '%)';
  }
}
