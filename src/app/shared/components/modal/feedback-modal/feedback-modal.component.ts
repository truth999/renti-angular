import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OfferService } from '../../../../modules/offer/services/offer.service';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
  @Input() result: any;
  feedbackForm: FormGroup;

  constructor(
    private modal: NgbActiveModal,
    private offerService: OfferService,
    private storageService: StorageService
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
    try {
      const tenantId = this.storageService.get('tenantId');
      const feedbackData = {
        ...this.result,
        tenantId,
        ...this.feedbackForm.value
      };

      await this.offerService.createFeedback(feedbackData);
      this.modal.dismiss();
    } catch (e) {
      console.log('FeedbackModalComponent->submit', e);
    }
  }

  onClose() {
    this.modal.dismiss();
  }

}
