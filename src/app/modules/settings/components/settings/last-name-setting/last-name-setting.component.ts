import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SettingsService } from '../../../services/settings.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-last-name-setting',
  templateUrl: './last-name-setting.component.html',
  styleUrls: ['./last-name-setting.component.scss']
})
export class LastNameSettingComponent implements OnInit {
  @Input() userId: string;
  @Output() lastNameUpdated = new EventEmitter<void>();
  lastNameForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.lastNameForm = new FormGroup({
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  async submit() {
    if (this.lastNameForm.valid) {
      const user = { ...this.lastNameForm.value };

      try {
        await this.settingsService.updateUser(this.userId, user);
        this.lastNameUpdated.emit();
        this.toastrService.success('The last name is updated successfully.', 'Success!');
      } catch (e) {
        console.log('LastNameSettingComponent->submit', e);
        this.toastrService.error('Something went wrong', 'Error');
      }
    } else {
      this.validateFormFieldsService.validate(this.lastNameForm);
    }
  }

}
