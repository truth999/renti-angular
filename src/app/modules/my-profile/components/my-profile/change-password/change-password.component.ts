import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { TranslateService } from '@ngx-translate/core';

import { MyProfileService } from '../../../services/my-profile.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordInvalid = false;
  message = '';

  constructor(
    private myProfileService: MyProfileService,
    private storageService: StorageService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const password = new FormControl(null, [Validators.required, Validators.min(5)]);
    const confirmPassword = new FormControl(null, CustomValidators.equalTo(password));

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(null, Validators.required),
      password,
      confirmPassword
    });
  }

  async submit() {
    if (this.passwordForm.valid) {
      const userId = this.storageService.get('userId');
      const passwordData = { ...this.passwordForm.value };

      try {
        await this.myProfileService.updateUser(userId, passwordData);
        this.passwordInvalid = false;
        this.message = '';
        const alert = this.translate.instant('ALERT.PASSWORD_UPDATED');
        const success = this.translate.instant('ALERT.SUCCESS');
        this.toastrService.success(alert, success);
      } catch (e) {
        console.log('ChangePasswordComponent->submit', e);
        if (e.message === 'PASSWORD_INCORRECT') {
          this.passwordInvalid = true;
          this.message = e.message;
        } else {
          const alert = this.translate.instant('ALERT.SOMETHING_WENT_WRONG');
          const error = this.translate.instant('ALERT.ERROR');
          this.toastrService.error(alert, error);
        }
      }
    } else {
      this.validateFormFieldsService.validate(this.passwordForm);
    }
  }

}
