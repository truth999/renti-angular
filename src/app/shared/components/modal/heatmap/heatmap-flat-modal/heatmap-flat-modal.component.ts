import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-heatmap-flat-modal',
  templateUrl: './heatmap-flat-modal.component.html',
  styleUrls: ['./heatmap-flat-modal.component.scss']
})
export class HeatmapFlatModalComponent implements OnInit {
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
