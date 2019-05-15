import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-password-setting',
  templateUrl: './password-setting.component.html',
  styleUrls: ['./password-setting.component.scss']
})
export class PasswordSettingComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('')
    });
  }

  async submit() {
    const user = { ...this.passwordForm.value };
    const userId = this.storageService.get('userId');

    try {
      await this.settingsService.updateUser(userId, user);
    } finally {
    }
  }

}
