import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { LandlordsComponent } from './components/landlords/landlords.component';
import { LandlordDetailPopupComponent } from './components/landlord-detail-popup/landlord-detail-popup.component';
import { LandlordService } from './services/landlord.service';
import { LandlordDetailComponent } from './components/landlord-detail/landlord-detail.component';

const landlordsRoutes: Routes = [
  {
    path: '',
    component: LandlordsComponent,
    data: { title: 'Landlords', breadcrumb: 'landlords' }
  }
];

@NgModule({
  declarations: [
    LandlordsComponent,
    LandlordDetailComponent,
    LandlordDetailPopupComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(landlordsRoutes),
  ],
  providers: [
    LandlordService
  ],
  entryComponents: [
    LandlordDetailPopupComponent,
  ]
})
export class LandlordsModule { }
