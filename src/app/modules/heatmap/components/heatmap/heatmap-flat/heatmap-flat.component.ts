import { Component, Input, OnInit } from '@angular/core';

import { HeatmapService } from '../../../services/heatmap.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-heatmap-flat',
  templateUrl: './heatmap-flat.component.html',
  styleUrls: ['./heatmap-flat.component.scss']
})
export class HeatmapFlatComponent implements OnInit {
  @Input() defaultLocation;
  apartments: any;
  uploadBase = environment.uploadBase;
  previous;

  constructor(
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
      console.log('HeatmapFlatComponent->getApartments', e);
    }
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }

    this.previous = infoWindow;
  }

}
