import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public urlApi: string;

  constructor( 
    private http: HttpClient,
    private router: Router
    ) {
    this.urlApi = `${environment.url}/auth`;
  }

  getToken() {
    const data = localStorage.getItem('auth');
    if (!!data) {
      let aux = JSON.parse(data);
      return aux ? aux.tokens : '';
    }
    return '';
  }

  loginSave(user: any, tokens: any) {
    let loginToSave = {
      tokens: tokens,
      user: user
    };
    localStorage.setItem('auth', JSON.stringify(loginToSave));
  }

  authentication(userData: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/signin`, userData);
  }
  
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/signup`, userData);
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
