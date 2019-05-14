import { EventEmitter, Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoEditModalComponent } from '../../components/modal/photo-edit-modal/photo-edit-modal.component';

@Injectable()
export class PhotoEditModalService {
  photo: any;
  photoChanged = new EventEmitter();

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    const modalRef = this.modalService.open(PhotoEditModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.result = result;

    modalRef.result.then(photo => {
      this.photo = photo;
      this.photoChanged.emit(this.photo);
    }, reason => {});
  }
}
