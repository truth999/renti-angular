import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { FirstNameSettingComponent } from './components/settings/first-name-setting/first-name-setting.component';
import { LastNameSettingComponent } from './components/settings/last-name-setting/last-name-setting.component';
import { EmailSettingComponent } from './components/settings/email-setting/email-setting.component';
import { PasswordSettingComponent } from './components/settings/password-setting/password-setting.component';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    SettingsComponent,
    FirstNameSettingComponent,
    LastNameSettingComponent,
    EmailSettingComponent,
    PasswordSettingComponent
  ],
  providers: [
    SettingsService
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
