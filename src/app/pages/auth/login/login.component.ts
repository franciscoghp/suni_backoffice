import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { CustomValidators } from '../../../utils/custom-validators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public wait: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, CustomValidators.isValidEmail]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {
    const token = this.authService.getToken();
    if (!!token) {
      this.router.navigate(['/dashboard']);
    }

  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }
  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let user = {
      email: !!this.email ? this.email.value : '',
      password: !!this.password ? this.password.value : ''
    };
    this.wait = true;
    this.authService.authentication(user).subscribe(
      (res) => {
        this.authService.loginSave(res.data.email, res.data.token);
        this.router.navigate(['/dashboard']);
        this.wait = false;
      },
      ({ error }) => {
        this.wait = false;
      }
    );
  }
 }
