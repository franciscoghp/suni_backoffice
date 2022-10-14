import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  public urlApi: string;

  constructor( private http: HttpClient ) { 
    this.urlApi = `${environment.url}/btc`;
  }

  getBlanceGeneral(){
      return this.http.get(this.urlApi + `/balance`)
  }

  getPriceBTC(){
      return this.http.get(this.urlApi + `/price-btc`)
  }
}
