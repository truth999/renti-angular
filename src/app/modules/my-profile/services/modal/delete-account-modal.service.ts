import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteAccountModalComponent } from '../../components/modal/delete-account-modal/delete-account-modal.component';

@Injectable()
export class DeleteAccountModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show() {
    this.modalService.open(DeleteAccountModalComponent, { size: 'lg', centered: true });
  }
}
