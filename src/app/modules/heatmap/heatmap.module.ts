import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatmapRoutingModule } from './heatmap-routing.module';

import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { HeatmapFlatComponent } from './components/heatmap/heatmap-flat/heatmap-flat.component';
import { HeatmapTenantComponent } from './components/heatmap/heatmap-tenant/heatmap-tenant.component';

import { HeatmapService } from './services/heatmap.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    HeatmapComponent,
    HeatmapFlatComponent,
    HeatmapTenantComponent
  ],
  providers: [
    HeatmapService
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    HeatmapRoutingModule
  ]
})
export class HeatmapModule { }