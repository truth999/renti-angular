import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HeatmapTenantModalComponent } from '../../../components/modal/heatmap/heatmap-tenant-modal/heatmap-tenant-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HeatmapTenantModalService {

  constructor(
    private modalService: NgbModal
  ) { }

  show(result) {
    this.modalService.open(HeatmapTenantModalComponent, { size: 'lg', centered: true })
      .componentInstance.result = result;
  }
}
