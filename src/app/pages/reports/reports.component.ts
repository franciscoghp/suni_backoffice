import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public form = new FormGroup({
    firstDate: new FormControl(''),
    secondDate: new FormControl(''),
  });
  public data: any;

  constructor(private userService: UserService ) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.userService.getUsers(this.form.value).subscribe( (res:any) => {
      console.log(res)
      this.data = res.data;
    });
  }

  listRefered(refered: boolean){
      this.userService.getUsersRefered(refered).subscribe( (res:any) => {
        console.log(res)
        this.data = res.data;
      });
  }

}
