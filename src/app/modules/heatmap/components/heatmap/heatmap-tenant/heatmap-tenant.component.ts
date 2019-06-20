import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heatmap-tenant',
  templateUrl: './heatmap-tenant.component.html',
  styleUrls: ['./heatmap-tenant.component.scss']
})
export class HeatmapTenantComponent implements OnInit {
  @Input() tenantLocations;
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
      data: this.tenantLocations
    });
  }

}
