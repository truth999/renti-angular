import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-heatmap-tenant-modal',
  templateUrl: './heatmap-tenant-modal.component.html',
  styleUrls: ['./heatmap-tenant-modal.component.scss']
})
export class HeatmapTenantModalComponent implements OnInit {
  @Input() result: any;
  map: google.maps.Map;
  heatmap: google.maps.visualization.HeatmapLayer;

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: this.result.locations
    });
  }

  onClose() {
    this.modal.dismiss();
  }

}
