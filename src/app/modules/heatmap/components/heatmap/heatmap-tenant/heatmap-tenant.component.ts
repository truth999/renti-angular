import { Component, Input, OnInit } from '@angular/core';
import { HeatmapService } from '../../../services/heatmap.service';

@Component({
  selector: 'app-heatmap-tenant',
  templateUrl: './heatmap-tenant.component.html',
  styleUrls: ['./heatmap-tenant.component.scss']
})
export class HeatmapTenantComponent implements OnInit {
  @Input() defaultLocation: any;
  tenantsLocation: any;

  constructor(
    private heatmapService: HeatmapService
  ) { }

  ngOnInit() {
    this.getTenantsLocation();
  }

  async getTenantsLocation() {
    try {
      const tenantsResponse = await this.heatmapService.getTenantsLocation();
      this.tenantsLocation = tenantsResponse.tenantsLocation;
    } catch (e) {
      console.log('HeatmapTenantComponent->getTenantsLocation', e);
    }
  }

}
