import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { AuthService } from '../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { CONFIG_CONST } from '../../../../../config/config-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  CONST_ACCOUNT_TYPE = CONFIG_CONST.accountType;

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
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
        this.router.navigate(['/auth/complete']);
      } catch (e) {
        this.signupFailed = true;
      }
    } else {
      this.validateFormFieldsService.validate(this.signupForm);
    }
  }

}
