import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapModalComponent } from '../../components/modal/map-modal/map-modal.component';

@Injectable()
export class MapModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    this.modalService.open(MapModalComponent, { size: 'lg', centered: true })
      .componentInstance.result = result;
  }
}
