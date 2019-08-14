import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { CONFIG_CONST } from '../../../../../config/config-const';
import { config } from '../../../../../config';
import { Validate } from '../../../../../config/validate';

import { Language } from '../../../../shared/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  CONST_ACCOUNT_TYPE = CONFIG_CONST.accountType;
  pattern = Validate;

  accountType: string;

  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';

  signupForm: FormGroup;

  signupFailed = false;
  message = '';

  supportedLanguages: Language[] = config.supportedLanguages;
  currentLanguage: Language = this.supportedLanguages[0];

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    const password = new FormControl(null, [Validators.required, Validators.minLength(5)]);
    const confirmPassword = new FormControl(null, CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      // firstName: new FormControl('', [Validators.required, Validators.pattern(this.pattern.firstName)]),
      // lastName: new FormControl('', [Validators.required, Validators.pattern(this.pattern.lastName)]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      accountType: new FormControl(null, [Validators.required]),
      password,
      confirmPassword
    });
  }

  onSelectType(accountType: string) {
    this.accountType = accountType;
    this.signupForm.patchValue({ accountType });
  }

  // changeLanguage(language: Language) {
  //   this.currentLanguage = language;
  //   this.signupForm.get('language').setValue(this.currentLanguage.code);
  // }

  async signup() {
    if (this.signupForm.valid) {
      try {
        this.signupFailed = false;
        const signupData = { ...this.signupForm.value, language:  this.translateService.currentLang};
        delete signupData.confirmPassword;
        const userResponse = await this.authService.createUser(signupData);
        this.translateService.use(userResponse.language);
        this.router.navigate(['/confirmation']);
        // this.router.navigate(['/auth/complete']);
      } catch (e) {
        console.log('SignupComponent->signup', e);
        this.signupFailed = true;
        if (e.data && e.data[0].msg && e.data[0].msg === 'ERROR.EMAIL_ALREADY_EXIST') {
          this.message = e.data[0].msg;
        }
      }
    } else {
      this.validateFormFieldsService.validate(this.signupForm);
    }
  }

}
