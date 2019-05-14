import { EventEmitter, Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoUploadModalComponent } from '../../components/modal/photo-upload-modal/photo-upload-modal.component';

@Injectable()
export class PhotoUploadModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show() {
    this.modalService.open(PhotoUploadModalComponent, { size: 'lg', centered: true });
  }
}
