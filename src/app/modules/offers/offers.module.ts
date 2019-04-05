import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

import {OffersComponent} from './components/offers/offers.component';
import { OfferDetailPopupComponent } from './components/offer-detail-popup/offer-detail-popup.component';
import {OfferService} from './services/offer.service';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';

const offersRoutes: Routes = [
  {
    path: '',
    component: OffersComponent,
    data: { title: 'Offers', breadcrumb: 'Offers' }
  }
];

@NgModule({
  declarations: [
    OffersComponent,
    OfferDetailPopupComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(offersRoutes),
  ],
  providers: [
    OfferService,
  ],
  entryComponents: [
    OfferDetailPopupComponent
  ]
})
export class OffersModule { }
