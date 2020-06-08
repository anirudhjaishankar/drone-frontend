import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginUrl, devUrl, logoutUrl } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  name: string;
  userRole: number;

  constructor(
    private http?: HttpClient
  ) {
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  }

  login(data): Promise<any> {
    return this.http.post(devUrl + loginUrl, { email: data.email, password: data.password }).toPromise();
  }

  logout(): Promise<any> {
    return this.http.get(devUrl + logoutUrl).toPromise();
  }
}
