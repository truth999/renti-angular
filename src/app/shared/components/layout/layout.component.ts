import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { NotificationsService } from '../../../core/services/notifications.service';

import { CONFIG_CONST } from '../../../../config/config-const';
import { User } from '../../models';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  AccountTypes = CONFIG_CONST.accountType;
  NotificationTypes = CONFIG_CONST.notificationType;
  user: User;
  notification = 0;

  private mqttSubscription: Subscription;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private mqttService: MqttService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getUser();

    const userId = this.storageService.get('userId');

    this.mqttSubscription = this.mqttService.observe(`live-notification/${userId}`).subscribe((message: IMqttMessage) => {
      this.notificationsService.setLiveNotification(message);
    });

    this.notification = this.notificationsService.getLiveNotifications(this.NotificationTypes.ALL);
    this.subscription = this.notificationsService.notificationsChanged.subscribe((notification: Notification) => {
      this.notification = notification[this.NotificationTypes.ALL];
    });
  }

  async getUser() {
    try {
      const response = await this.authService.getAuthUser();
      this.user = response.user;

      if (this.user.accountType === this.AccountTypes.LANDLORD) {
        this.notificationsService.setNotification(this.user.accountType, this.user.notification);
      } else {
        this.notificationsService.setNotification(this.user.accountType, this.user.notification);
      }

      this.notification = this.notificationsService.getLiveNotifications(this.NotificationTypes.ALL);
    } catch (e) {
      console.log('LayoutComponent->getAccountType', e);
    }
  }

  onOpenMenu() {
    const mobileMenuContentEl = document.querySelector('.layout');

    mobileMenuContentEl.classList.add('toggled');
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.mqttSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}
