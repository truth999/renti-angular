import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FloorPlanModalComponent } from '../../components/modal/floor-plan-modal/floor-plan-modal.component';

@Injectable()
export class FloorPlanModalService {
  saveFloorplan = new EventEmitter<void>();

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    const modalRef = this.modalService.open(FloorPlanModalComponent, { centered: true, windowClass: 'floor-plan-modal' });
    modalRef.componentInstance.result = result;

    modalRef.result.then(() => {
      this.saveFloorplan.emit();
    }, reason => {});
  }
}
