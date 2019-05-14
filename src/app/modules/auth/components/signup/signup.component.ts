import { Component, OnInit } from '@angular/core';
import { CONFIG_CONST } from '../../../../../config/config-const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../../../../core/services/auth.service';

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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
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

  signup() {
    const signupData = { ...this.signupForm.value };
    delete signupData.confirmPassword;
    this.authService.createUser(signupData);
  }

}
