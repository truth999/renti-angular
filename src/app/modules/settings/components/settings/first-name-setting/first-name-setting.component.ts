import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-first-name-setting',
  templateUrl: './first-name-setting.component.html',
  styleUrls: ['./first-name-setting.component.scss']
})
export class FirstNameSettingComponent implements OnInit {
  firstNameForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.firstNameForm = new FormGroup({
      firstName: new FormControl('', Validators.required)
    });
  }

  async submit() {
    const user = { ...this.firstNameForm.value };
    const userId = this.storageService.get('userId');
    try {
      await this.settingsService.updateUser(userId, user);
    } finally {
    }
  }

}
