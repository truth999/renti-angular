import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FeedbackModalComponent } from '../../components/modal/feedback-modal/feedback-modal.component';

@Injectable()
export class FeedbackModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    const modalRef = this.modalService.open(FeedbackModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.result = result;
  }
}
