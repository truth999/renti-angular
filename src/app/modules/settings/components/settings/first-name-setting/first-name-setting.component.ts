import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SettingsService } from '../../../services/settings.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-first-name-setting',
  templateUrl: './first-name-setting.component.html',
  styleUrls: ['./first-name-setting.component.scss']
})
export class FirstNameSettingComponent implements OnInit {
  @Input() userId: string;
  @Output() firstNameUpdated = new EventEmitter<void>();
  firstNameForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.firstNameForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  async submit() {
    if (this.firstNameForm.valid) {
      const user = { ...this.firstNameForm.value };

      try {
        await this.settingsService.updateUser(this.userId, user);
        this.firstNameUpdated.emit();
        this.toastrService.success('The first name is updated successfully.', 'Success!');
      } catch (e) {
        console.log('FirstNameSettingComponent->submit', e);
        this.toastrService.error('Something went wrong', 'Error');
      }
    } else {
      this.validateFormFieldsService.validate(this.firstNameForm);
    }
  }

}
