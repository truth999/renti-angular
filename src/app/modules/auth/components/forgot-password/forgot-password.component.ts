import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  async submit() {
    if (this.forgotPasswordForm.valid) {
      try {
        const email = { ...this.forgotPasswordForm.value };
        await this.authService.forgotPassword(email);
        this.router.navigate(['/confirmation']);
      } catch (e) {
        if (e.message === 'EMAIL_INCORRECT') {
          this.forgotPasswordForm.get('email').setErrors({ incorrectEmail: true, errMsg: e.message });
        } else {
          console.log('ForgotPasswordComponent->submit', e);
          this.router.navigate(['/confirmation']);
        }
      }
    } else {
      this.validateFormFieldsService.validate(this.forgotPasswordForm);
    }
  }

}
