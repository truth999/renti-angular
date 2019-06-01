import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SettingsService } from '../../../services/settings.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.scss']
})
export class EmailSettingComponent implements OnInit {
  @Input() userId: string;
  @Output() emailUpdated = new EventEmitter<void>();
  emailForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', Validators.required)
    });
  }

  async submit() {
    if (this.emailForm.valid) {
      const user = { ...this.emailForm.value };

      try {
        await this.settingsService.updateUser(this.userId, user);
        this.emailUpdated.emit();
        this.toastrService.success('The email is updated successfully.', 'Success!');
      } catch (e) {
        console.log('EmailSettingComponent->submit', e);
        this.toastrService.error('Something went wrong', 'Error');
      }
    } else {
      this.validateFormFieldsService.validate(this.emailForm);
    }
  }

}
