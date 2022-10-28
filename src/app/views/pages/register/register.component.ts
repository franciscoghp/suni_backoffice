import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { CustomValidators } from '../../../utils/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, CustomValidators.isValidEmail]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    language: ['es', [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) { }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('(ngSubmit)="onSubmit()"', this.form.value)
    // let user = {
    //   email: !!this.email ? this.email.value : '',
    //   password: !!this.password ? this.password.value : ''
    // };
    // this.wait = true;
    this.authService.register(this.form.value).subscribe(
      (res) => {
        this.authService.loginSave(res.data.email, res.data.token);
        this.router.navigate(['/dashboard']);
        // this.wait = false;
      },
      ( error ) => {
        // this.wait = false;
      }
    );
  }

}
