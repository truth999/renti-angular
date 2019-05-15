import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-last-name-setting',
  templateUrl: './last-name-setting.component.html',
  styleUrls: ['./last-name-setting.component.scss']
})
export class LastNameSettingComponent implements OnInit {
  lastNameForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.lastNameForm = new FormGroup({
      lastName: new FormControl('', Validators.required)
    });
  }

  async submit() {
    const user = { ...this.lastNameForm.value };
    const userId = this.storageService.get('userId');
    try {
      await this.settingsService.updateUser(userId, user);
    } finally {
    }
  }

}
