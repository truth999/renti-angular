import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeatmapFlatModalService } from '../../../shared/services/modal/heatmap/heatmap-flat-modal.service';
import { HeatmapTenantModalService } from '../../../shared/services/modal/heatmap/heatmap-tenant-modal.service';
import { HeatmapService } from '../../../modules/heatmap/services/heatmap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defaultLocation: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heatmapFlatModalService: HeatmapFlatModalService,
    private heatmapTenantModalService: HeatmapTenantModalService,
    private heatmapService: HeatmapService
  ) { }

  ngOnInit() {
    this.getDefaultLocation();
  }

  async getDefaultLocation() {
    try {
      const response = await this.heatmapService.getDefaultLocation();
      this.defaultLocation = response.location;
    } catch (e) {
      console.log('HomeComponent->getDefaultLocation', e);
    }
  }

  onSignup() {
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onOpenHeatmapFlatModal() {
    const results = this.defaultLocation;

    this.heatmapFlatModalService.show(results);
  }

  onOpenHeatmapTenantModal() {
    const results = this.defaultLocation;

    this.heatmapTenantModalService.show(results);
  }

}
