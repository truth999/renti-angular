import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Offer, Tenant } from '../../../../../../shared/models';

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
  @Input() offerIndex: number;
  @Output() offerDeleted = new EventEmitter<void>();
  tenant: Tenant;

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
      this.cursorWaitService.enable();

      const response = await this.authService.getUser(this.offer.user._id);

      if (!!response.user) {
        this.tenant = response.user.tenant;
      }
    } catch (e) {
      console.log('OfferComponent->getOfferInfo');
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onProfile() {
    this.router.navigate(['/app/profile', this.offer.user._id]);
  }

  onSuccess() {
    this.router.navigate(['/app/offers', this.offer.user._id, 'success']);
  }

  async onDelete() {
    try {
      this.cursorWaitService.enable();

      await this.offerService.deleteOffer(this.offer._id);
      this.toastrService.success('The offer is deleted successfully.', 'Success!');
      this.offerDeleted.emit();
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('OfferComponent->onDelete', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
