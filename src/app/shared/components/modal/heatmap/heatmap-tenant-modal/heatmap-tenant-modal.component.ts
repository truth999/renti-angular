import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HeatmapService } from '../../../../../modules/heatmap/services/heatmap.service';

@Component({
  selector: 'app-heatmap-tenant-modal',
  templateUrl: './heatmap-tenant-modal.component.html',
  styleUrls: ['./heatmap-tenant-modal.component.scss']
})
export class HeatmapTenantModalComponent implements OnInit {
  @Input() result: any;
  tenantsLocation: any;

  constructor(
    private modal: NgbActiveModal,
    private heatmapService: HeatmapService
  ) { }

  ngOnInit() {
    this.getTenantsLocation();
  }

  async getTenantsLocation() {
    try {
      const response = await this.heatmapService.getTenantsLocation();
      this.tenantsLocation = response.tenantsLocation;
    } catch (e) {
      console.log('HeatmapTenantModalComponent->getTenantsLocation', e);
    }
  }

  onClose() {
    this.modal.dismiss();
  }

}
