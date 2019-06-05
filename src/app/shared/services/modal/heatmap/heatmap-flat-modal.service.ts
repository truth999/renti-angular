import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HeatmapFlatModalComponent } from '../../../components/modal/heatmap/heatmap-flat-modal/heatmap-flat-modal.component';

@Injectable()
export class HeatmapFlatModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    this.modalService.open(HeatmapFlatModalComponent, { size: 'lg', centered: true })
      .componentInstance.result = result;
  }
}
