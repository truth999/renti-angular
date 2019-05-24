import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Offer, Tenant } from '../../../../../../shared/models';

import { environment } from '../../../../../../../environments/environment';

import { OfferService } from '../../../../services/offer.service';
import { CursorWaitService } from '../../../../../../core/services/cursor-wait.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer;
  @Input() offerIndex: number;
  @Output() offerDeleted = new EventEmitter<void>();
  user: any;
  tenant: Tenant;

  uploadBase = environment.uploadBase;

  constructor(
    private router: Router,
    private offerService: OfferService,
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService
  ) { }

  async ngOnInit() {
    try {
      this.cursorWaitService.enable();

      const userResponse = await this.offerService.getUser(this.offer.user);
      this.user = userResponse.user;

      const tenantResponse = await this.offerService.getTenant(userResponse.user.tenantId);
      this.tenant = tenantResponse.tenant;
    } catch (e) {
      console.log('OfferComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onProfile() {
    this.router.navigate(['/app/profile', this.offer.user]);
  }

  onSuccess() {
    this.router.navigate(['/app/offers', this.offer.user, 'success']);
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
