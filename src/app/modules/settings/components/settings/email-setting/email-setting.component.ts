import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.scss']
})
export class EmailSettingComponent implements OnInit {
  emailForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async submit() {
    const user = { ...this.emailForm.value };
    const userId = this.storageService.get('userId');
    try {
      await this.settingsService.updateUser(userId, user);
    } finally {
    }
  }

}
