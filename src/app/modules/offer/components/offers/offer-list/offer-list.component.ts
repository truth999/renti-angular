import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { OfferService } from '../../../services/offer.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { FeedbackModalService } from '../../../../../shared/services/modal/feedback-modal.service';
import { NotificationsService } from '../../../../../core/services/notifications.service';

import { Offer, Page } from '../../../../../shared/models';
import { Notification } from '../../../../../shared/models/notification.model';

import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit, OnDestroy {
  offers: Offer[];
  page = new Page();
  accepted: boolean;
  sort: string;
  AccountTypes = CONFIG_CONST.accountType;
  notification: any;
  subscription: Subscription;
  NotificationTypes = CONFIG_CONST.notificationType;
  private activeId = 'received';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private offerService: OfferService,
    private authService: AuthService,
    private storageService: StorageService,
    private feedbackModalService: FeedbackModalService,
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
    this.sort = 'createdAt';

    this.getOffers(this.sort);
    this.feedbackModalService.giveFeedback.subscribe(() => {
      this.getOffers(this.sort, true);
    });

    this.notification = this.notificationsService.getLiveNotifications(this.NotificationTypes.RECEIVED);
    this.subscription = this.notificationsService.notificationsChanged.subscribe((notification: Notification) => {
      this.notification = notification[this.NotificationTypes.RECEIVED];

      if (this.activeId === 'received') {
        this.getOffers(this.sort);
      }
    });
  }

  async getOffers(sort, accepted?: boolean) {
    try {
      const landlordId = this.storageService.get('landlordId');
      const offersResponse = typeof accepted === 'undefined'
        ? await this.offerService.getOffersByLandlord(this.page, landlordId, sort)
        : await this.offerService.getOffersByLandlord(this.page, landlordId, sort, accepted);
      this.offers = offersResponse.offers;
      this.page.totalElements = offersResponse.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('OfferListComponent->getOffers', e);
    }
  }

  changeTab(event: NgbTabChangeEvent) {
    if (event.nextId === 'received') {
      this.activeId = event.nextId;
      this.notificationsService.clean(this.NotificationTypes.RECEIVED);
      this.page.pageNumber = 1;
      this.accepted = null;
      this.getOffers(this.sort);
    }
    if (event.nextId === 'accepted') {
      this.activeId = event.nextId;
      this.page.pageNumber = 1;
      this.accepted = true;
      this.getOffers(this.sort, true);
    }
    if (event.nextId === 'rejected') {
      this.activeId = event.nextId;
      this.page.pageNumber = 1;
      this.accepted = false;
      this.getOffers(this.sort, false);
    }
  }

  rejectedOffers() {
    this.getOffers(this.sort);
  }

  pageChange(event) {
    this.page.pageNumber = event;

    if (this.accepted === true || this.accepted === false) {
      this.getOffers(this.sort, this.accepted);
    } else {
      this.getOffers(this.sort);
    }
  }

  onSort(event) {
    this.sort = event.target.value;

    if (this.accepted === true || this.accepted === false) {
      this.getOffers(this.sort, this.accepted);
    } else {
      this.getOffers(this.sort);
    }
  }

  async onGiveFeedback(offerId) {
    try {
      const landlordId = this.storageService.get('landlordId');
      const offerResponse = await this.offerService.getOfferByLandlord(offerId);
      const offer = offerResponse.offer;

      if (!offer.landlordFeedback) {
        const feedbackData = {
          type: this.AccountTypes.LANDLORD,
          offerId,
          tenant: offer.tenant,
          landlordId
        };

        this.feedbackModalService.show(feedbackData);
      }
    } catch (e) {
      console.log('OfferComponent->onGiveFeedback', e);
    }
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
