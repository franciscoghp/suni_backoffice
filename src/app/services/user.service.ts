import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public urlApi: string;

  constructor( private http: HttpClient ) { 
    this.urlApi = `${environment.url}/user`;
  }

  getUsers(params?: any){
    if( !!params ) {
      const firstDate = params.firstDate;
      const secondDate = params.secondDate;
      return this.http.get(this.urlApi + '?' + `firstDate=${firstDate}&secondDate=${secondDate}`)
    }
   else return this.http.get(this.urlApi)
  }
  
  getUsersRefered(refered: boolean){
    console.log('refered', refered)
    if( !!refered ) {
      return this.http.get(this.urlApi + '?' + `refered=true`)
    }
   else return this.http.get(this.urlApi + '?' + `refered=false`)
  }
}
