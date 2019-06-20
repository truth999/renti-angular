import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heatmap-flat',
  templateUrl: './heatmap-flat.component.html',
  styleUrls: ['./heatmap-flat.component.scss']
})
export class HeatmapFlatComponent implements OnInit {
  @Input() apartmentLocations;
  @Input() latitude: number;
  @Input() longitude: number;
  map: google.maps.Map;
  heatmap: google.maps.visualization.HeatmapLayer;

  constructor() { }

  ngOnInit() {
  }

  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: this.apartmentLocations
    });
  }

}
