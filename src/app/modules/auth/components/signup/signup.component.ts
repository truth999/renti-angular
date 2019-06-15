import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

import { AuthService } from '../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { Validate } from '../../../../../config/validate';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  CONST_ACCOUNT_TYPE = CONFIG_CONST.accountType;
  pattern = Validate;

  accountType: string;

  passwordCheck = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';

  signupForm: FormGroup;

  signupFailed = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    const password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      // firstName: new FormControl('', [Validators.required, Validators.pattern(this.pattern.firstName)]),
      // lastName: new FormControl('', [Validators.required, Validators.pattern(this.pattern.lastName)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      accountType: new FormControl('', [Validators.required]),
      password,
      confirmPassword
    });
  }

  onSelectType(accountType: string) {
    this.accountType = accountType;
    this.signupForm.patchValue({ accountType });
  }

  async signup() {
    if (this.signupForm.valid) {
      try {
        this.signupFailed = false;
        const signupData = { ...this.signupForm.value };
        delete signupData.confirmPassword;
        await this.authService.createUser(signupData);
        this.router.navigate(['/alert']);
        // this.router.navigate(['/auth/complete']);
      } catch (e) {
        this.signupFailed = true;
      }
    } else {
      this.validateFormFieldsService.validate(this.signupForm);
    }
  }

}
