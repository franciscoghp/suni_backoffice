import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public urlApi: string;

  constructor( private http: HttpClient ) { 
    this.urlApi = `${environment.url}/btc`;
  }

  getTransactions(sent: boolean){
    if( !!sent ) {
      return this.http.get(this.urlApi + `/transactions-sent`)
    }
    else return this.http.get(this.urlApi + `/transactions-received`)
  }
}
