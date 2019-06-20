import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Offer, User } from '../../../../../../shared/models';

import { environment } from '../../../../../../../environments/environment';

import { OfferService } from '../../../../services/offer.service';
import { CursorWaitService } from '../../../../../../core/services/cursor-wait.service';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer;
  @Output() offerDeleted = new EventEmitter<void>();
  user: User;

  uploadBase = environment.uploadBase;

  constructor(
    private router: Router,
    private offerService: OfferService,
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getOfferInfo();
  }

  async getOfferInfo() {
    try {
      const response = await this.authService.getUser(this.offer.tenant.user);
      this.user = response.user;
    } catch (e) {
      console.log('OfferComponent->getOfferInfo');
    }
  }

  onProfile() {
    this.router.navigate(['/app/profile/tenant', this.offer.tenant._id]);
  }

  async onSuccess() {
    try {
      const offer = {
        ...this.offer,
        accepted: true
      };

      await this.offerService.updateOffer(offer);
      this.router.navigate(['/app/offers', this.offer.tenant._id, 'success']);
    } catch (e) {
      console.log('OfferComponent->onSuccess', e);
    }
  }

  async onDelete() {
    try {
      await this.offerService.deleteOffer(this.offer._id);
      this.toastrService.success('The offer is deleted successfully.', 'Success!');
      this.offerDeleted.emit();
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('OfferComponent->onDelete', e);
    }
  }

}
