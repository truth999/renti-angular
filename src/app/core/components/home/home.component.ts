import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeatmapService } from '../../../modules/heatmap/services/heatmap.service';
import { MapModalService } from '../../services/modal/map-modal.service';

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
    private mapModalService: MapModalService,
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

  onOpenMapModal(type) {
    const results = {
      location: this.defaultLocation,
      type
    };

    this.mapModalService.show(results);
  }

}
