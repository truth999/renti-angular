import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  error = false;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const password = new FormControl(null, [Validators.required, Validators.minLength(5)]);
    const confirmPassword = new FormControl(null, CustomValidators.equalTo(password));
    this.resetPasswordForm = new FormGroup({
      password,
      confirmPassword
    });
  }

  async submit() {
    if (this.resetPasswordForm.valid) {
      try {
        const token = this.route.snapshot.paramMap.get('token');
        const password = { ...this.resetPasswordForm.value };
        delete password.confirmPassword;
        await this.authService.resetPasssword(token, password);
        this.error = false;
        const alert = this.translate.instant('ALERT.PASSWORD_CHANGED');
        const success = this.translate.instant('ALERT.SUCCESS');
        this.toastrService.success(alert, success);
        this.router.navigate(['/login']);
      } catch (e) {
        if (e.message === 'PASSWORD_RESET_FAILED') {
          this.error = true;
          this.message = e.message;
        } else {
          console.log('ResetPasswordComponent->submit', e);
          const alert = this.translate.instant('ALERT.SOMETHING_WENT_WRONG');
          const error = this.translate.instant('ALERT.ERROR');
          this.toastrService.error(alert, error);
        }
      }
    } else {
      this.validateFormFieldsService.validate(this.resetPasswordForm);
    }
  }

}
