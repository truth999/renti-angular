import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from '../../shared/models/notification.model';

import { CONFIG_CONST } from '../../../config/config-const';

@Injectable()
export class NotificationsService {
  notifications: Notification = {
    received: 0,
    accepted: 0,
    rejected: 0,
    all: 0
  };
  notificationsChanged = new Subject<Notification>();
  AccountTypes = CONFIG_CONST.accountType;

  constructor() { }

  setLiveNotification(message) {
    const messageContent = JSON.parse(message.payload.toString());

    this.notifications[messageContent.type]++;
    this.notifications.all++;

    this.notificationsChanged.next(this.notifications);
  }

  setNotification(type, notification) {
    if (type === this.AccountTypes.LANDLORD) {
      this.notifications.received = notification.received;
      this.notifications.all = notification.received;
    } else {
      this.notifications.accepted = notification.accepted;
      this.notifications.rejected = notification.rejected;
      this.notifications.all = notification.accepted + notification.rejected;
    }
  }

  getLiveNotifications(type?) {
    if (!!type) {
      return this.notifications[type];
    } else {
      return this.notifications;
    }
  }

  clean(type, received?: boolean) {
    const count = this.notifications[type];

    if (!received) {
      this.notifications[type] = 0;
    }

    this.notifications.all -= count;

    this.notificationsChanged.next(this.notifications);
  }

  cleanReceived() {
    this.notifications.received = 0;
    this.notificationsChanged.next(this.notifications);
  }
}
