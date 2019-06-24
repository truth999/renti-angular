import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { OfferService } from '../../../../modules/offer/services/offer.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';
import { AuthService } from '../../../../core/services/auth.service';

import { CONFIG_CONST } from '../../../../../config/config-const';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
  @Input() result: any;
  feedbackForm: FormGroup;
  AccountType = CONFIG_CONST.accountType;

  constructor(
    private modal: NgbActiveModal,
    private offerService: OfferService,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildFeedbackForm();
  }

  buildFeedbackForm() {
    this.feedbackForm = new FormGroup({
      feedbackStar: new FormControl(0),
      feedbackText: new FormControl(null, Validators.required)
    });
  }

  async submit() {
    if (this.feedbackForm.valid) {
      try {
        const response = await this.authService.getAuthUser();
        const accountType = response.user.accountType;
        if (accountType === this.AccountType.LANDLORD) {
          const landlordId = this.storageService.get('landlordId');
          const feedbackData = {
            ...this.result,
            ...this.feedbackForm.value
          };

          await this.offerService.createFeedbackByLandlord(landlordId, feedbackData);
        }
        if (accountType === this.AccountType.TENANT) {
          const tenantId = this.storageService.get('tenantId');
          const feedbackData = {
            ...this.result,
            ...this.feedbackForm.value
          };

          await this.offerService.createFeedbackByTenant(tenantId, feedbackData);
        }
        this.toastrService.success('You have given feedback successfully.', 'Success!');
        this.modal.close();
      } catch (e) {
        this.toastrService.error('Something went wrong', 'Error');
        console.log('FeedbackModalComponent->submit', e);
      }
    } else {
      this.validateFormFieldsService.validate(this.feedbackForm);
    }
  }

  onClose() {
    this.modal.dismiss();
  }

}
