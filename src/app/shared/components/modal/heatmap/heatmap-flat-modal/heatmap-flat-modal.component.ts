import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HeatmapService } from '../../../../../modules/heatmap/services/heatmap.service';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-heatmap-flat-modal',
  templateUrl: './heatmap-flat-modal.component.html',
  styleUrls: ['./heatmap-flat-modal.component.scss']
})
export class HeatmapFlatModalComponent implements OnInit {
  @Input() result: any;
  apartments: any;
  uploadBase = environment.uploadBase;
  previous;

  constructor(
    private modal: NgbActiveModal,
    private heatmapService: HeatmapService
  ) { }

  ngOnInit() {
    this.getApartments();
  }

  async getApartments() {
    try {
      const response = await this.heatmapService.getApartments();
      this.apartments = response.apartments;
    } catch (e) {
      console.log('HeatmapFlatModalComponent->getApartmentsLocation', e);
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
