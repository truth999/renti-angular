import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';

import { SettingsService } from '../../../services/settings.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-password-setting',
  templateUrl: './password-setting.component.html',
  styleUrls: ['./password-setting.component.scss']
})
export class PasswordSettingComponent implements OnInit {
  @Input() userId: string;
  @Output() passwordUpdated = new EventEmitter<void>();
  passwordForm: FormGroup;
  passwordInvalid = false;
  message = '';

  constructor(
    private settingsService: SettingsService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    const password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      password,
      confirmPassword
    });
  }

  async submit() {
    if (this.passwordForm.valid) {
      const user = { ...this.passwordForm.value };

      try {
        await this.settingsService.updateUser(this.userId, user);
        this.passwordInvalid = false;
        this.message = '';
        this.passwordUpdated.emit();
        this.toastrService.success('The password is updated successfully.', 'Success!');
      } catch (e) {
        console.log('PasswordSettingComponent->submit', e);
        if (e.message === 'PASSWORD_INCORRECT') {
          this.passwordInvalid = true;
          this.message = e.message;
        } else {
          this.toastrService.error('Something went wrong', 'Error');
        }
      }
    } else {
      this.validateFormFieldsService.validate(this.passwordForm);
    }
  }

}
