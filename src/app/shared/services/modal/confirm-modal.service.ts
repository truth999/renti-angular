import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '../../components/modal/confirm-modal/confirm-modal.component';

@Injectable()
export class ConfirmModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true });
    modalRef.componentInstance.result = result;
  }
}
