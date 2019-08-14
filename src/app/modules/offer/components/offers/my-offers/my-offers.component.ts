import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { OfferService } from '../../../services/offer.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { FeedbackModalService } from '../../../../../shared/services/modal/feedback-modal.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { NotificationsService } from '../../../../../core/services/notifications.service';

import { Offer, Page } from '../../../../../shared/models';
import { Notification } from '../../../../../shared/models/notification.model';

import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
  offers: Offer[];
  tenantId: string;
  page = new Page();
  accepted: boolean;
  notification: any;
  AccountTypes = CONFIG_CONST.accountType;
  NotificationTypes = CONFIG_CONST.notificationType;
  subscription: Subscription;
  private activeId = 'pending';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private offerService: OfferService,
    private storageService: StorageService,
    private feedbackModalService: FeedbackModalService,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    const userId = this.storageService.get('userId');
    const queryUserId = this.route.snapshot.queryParams.userId;

    if (!!queryUserId) {
      if (userId !== queryUserId) {
        this.authService.logout(this.router.url);
      } else {
        const queryOfferId = this.route.snapshot.queryParams.offerId;

        this.onGiveFeedback(queryOfferId);
      }
    }
  }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getOffers();
    this.feedbackModalService.giveFeedback.subscribe(() => {
      this.getOffers(true);
    });

    this.notification = this.notificationsService.getLiveNotifications();
    this.subscription = this.notificationsService.notificationsChanged.subscribe((notification: Notification) => {
      this.notification = notification;

      if (this.activeId === 'accepted') {
        this.getOffers(true);
      } else if (this.activeId === 'rejected') {
        this.getOffers(false);
      }
    });
  }

  async getOffers(accepted?: boolean) {
    try {
      const tenantId = this.storageService.get('tenantId');
      this.tenantId = tenantId;
      const response = typeof accepted === 'undefined'
        ? await this.offerService.getOffersByTenant(this.page, tenantId)
        : await this.offerService.getOffersByTenant(this.page, tenantId, accepted);
      this.offers = response.offers;
      this.page.totalElements = response.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('MyOffersComponent->getOffers', e);
    }
  }

  changeTab(event: NgbTabChangeEvent) {
    if (event.nextId === 'pending') {
      this.activeId = event.nextId;
      this.page.pageNumber = 1;
      this.accepted = null;
      this.getOffers();
    }
    if (event.nextId === 'accepted') {
      this.activeId = event.nextId;
      this.notificationsService.clean(this.NotificationTypes.ACCEPTED);
      this.page.pageNumber = 1;
      this.accepted = true;
      this.getOffers(true);
    }
    if (event.nextId === 'rejected') {
      this.activeId = event.nextId;
      this.notificationsService.clean(this.NotificationTypes.REJECTED);
      this.page.pageNumber = 1;
      this.accepted = false;
      this.getOffers(false);
    }
  }

  async onGiveFeedback(offerId, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    try {
      const offerResponse = await this.offerService.getOfferByTenant(offerId);
      const offer = offerResponse.offer;

      if (!offer.tenantFeedback) {
        const feedbackData = {
          type: this.AccountTypes.TENANT,
          offerId,
          landlord: offer.apartment.landlord,
          tenantId: this.tenantId
        };

        this.feedbackModalService.show(feedbackData);
      }
    } catch (e) {
      console.log('MyOffersComponent->onGiveFeedback', e);
    }
  }

  pageChange(event) {
    this.page.pageNumber = event;

    if (this.accepted === true || this.accepted === false) {
      this.getOffers(this.accepted);
    } else {
      this.getOffers();
    }
  }

  async onChangeStatus(id: string) {
    try {
      await this.offerService.changeOfferStatus(id);
    } catch (e) {
      console.log('MyOffersComponent->onChangeStatus', e);
    }
  }

  onBack() {
    this.location.back();
  }

}
