import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public data: any;
  public sent: boolean;
  priceBTC: number;

  constructor( private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  ListSent(sent: boolean){
    if ( !!sent )this.sent = true;
    else this.sent = false
    this.transactionService.getTransactions(sent).subscribe( (res:any) => {
      console.log(res)
      this.data = res.data.data.txs;
      this.priceBTC = res.data.data.priceBTC.data.prices[0].price;
      this.priceBTC = Number(this.priceBTC)
      console.log('this.priceBTC' , this.priceBTC)
      // if( this.sent ){

      // }
    }, (error) => {
      console.log('el error' , error)
    });
}
}
