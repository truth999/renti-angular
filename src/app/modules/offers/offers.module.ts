import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OffersComponent} from './components/offers/offers.component';
import { OfferDetailPopupComponent } from './components/offer-detail-popup/offer-detail-popup.component';
import {Routes} from '@angular/router';

const offersRoutes: Routes = [
  {
    path: '',
    component: OffersComponent,
    data: { title: 'Offers', breadcrumb: 'offers' }
  }
];

@NgModule({
  declarations: [
    OffersComponent,
    OfferDetailPopupComponent
  ],

  imports: [
    CommonModule
  ]
})
export class OffersModule { }
