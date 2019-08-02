import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { OfferService } from '../../../../modules/offer/services/offer.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
  @Input() result: any;
  feedbackForm: FormGroup;
  AccountType = CONFIG_CONST.accountType;
  uploadBase = environment.uploadBase;
  rate: number;
  feedbackNumber: number;
  overallRate: number;

  constructor(
    private modal: NgbActiveModal,
    private offerService: OfferService,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    if (this.result.type === this.AccountType.LANDLORD) {
      if (this.result.tenant.feedback.length !== 0) {
        const totalRate = this.result.tenant.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar.overall;
        }, 0);
        this.rate = parseInt((totalRate / this.result.tenant.feedback.length).toFixed(0), 10) - 1;
        this.feedbackNumber = this.result.tenant.feedback.length;
      }
    }

    if (this.result.type === this.AccountType.TENANT) {
      if (this.result.landlord.feedback.length !== 0) {
        const totalRate = this.result.landlord.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar.overall;
        }, 0);
        this.rate = parseInt((totalRate / this.result.landlord.feedback.length).toFixed(0), 10) - 1;
        this.feedbackNumber = this.result.landlord.feedback.length;
      }
    }

    this.buildFeedbackForm();
  }

  buildFeedbackForm() {
    this.feedbackForm = new FormGroup({
      feedbackStar: new FormGroup({
        availability: new FormControl(0),
        communication: new FormControl(0),
        cooperation: new FormControl(0),
        professionalism: new FormControl(0),
        recommend: new FormControl(0),
        overall: new FormControl(0)
      }),
      feedbackText: new FormControl(null)
    });
  }

  get availability() {
    return this.feedbackForm.get('feedbackStar').get('availability').value;
  }

  get communication() {
    return this.feedbackForm.get('feedbackStar').get('communication').value;
  }

  get cooperation() {
    return this.feedbackForm.get('feedbackStar').get('cooperation').value;
  }

  get professionalism() {
    return this.feedbackForm.get('feedbackStar').get('professionalism').value;
  }

  get recommend() {
    return this.feedbackForm.get('feedbackStar').get('recommend').value;
  }

  get overall() {
    return this.feedbackForm.get('feedbackStar').get('overall');
  }

  changeRate() {
    this.overallRate = (this.availability + this.communication + this.cooperation + this.professionalism + this.recommend) / 5;

    this.overall.setValue(this.overallRate);
  }

  async submit() {
    if (this.feedbackForm.valid) {
      try {
        if (this.result.type === this.AccountType.LANDLORD) {
          const landlordId = this.result.landlordId;
          const tenantId = this.result.tenant._id;
          const offerId = this.result.offerId;
          const feedbackData = {
            ...this.feedbackForm.value,
            offerId,
            tenantId
          };

          await this.offerService.createFeedbackByLandlord(landlordId, feedbackData);
        }
        if (this.result.type === this.AccountType.TENANT) {
          const tenantId = this.result.tenantId;
          const landlordId = this.result.landlord._id;
          const offerId = this.result.offerId;
          const feedbackData = {
            ...this.feedbackForm.value,
            offerId,
            landlordId
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
