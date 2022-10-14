import { Validators } from '@angular/forms';
export class CustomValidators {
  static readonly isValidEmail = Validators.pattern(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  static readonly isValidPassword = Validators.pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"@#%&\/,><\':;|_~`])?\S{8,99}$/,
  );
}
