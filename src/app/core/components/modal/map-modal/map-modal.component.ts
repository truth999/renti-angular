import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HeatmapService } from '../../../../modules/heatmap/services/heatmap.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {
  @Input() result: any;
  apartments: any;
  tenantsLocation: any;
  previous;
  uploadBase = environment.uploadBase;

  constructor(
    private modal: NgbActiveModal,
    private heatmapService: HeatmapService
  ) { }

  ngOnInit() {
    if (this.result.type === 'flat') {
      this.getApartments();
    } else {
      this.getTenantsLocation();
    }
  }

  async getApartments() {
    try {
      const response = await this.heatmapService.getApartments();
      this.apartments = response.apartments;
    } catch (e) {
      console.log('MapModalComponent->getApartmentsLocation', e);
    }
  }

  async getTenantsLocation() {
    try {
      const response = await this.heatmapService.getTenantsLocation();
      this.tenantsLocation = response.tenantsLocation;
    } catch (e) {
      console.log('MapModalComponent->getTenantsLocation', e);
    }
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }

    this.previous = infoWindow;
  }

  onClose() {
    this.modal.dismiss();
  }

}
