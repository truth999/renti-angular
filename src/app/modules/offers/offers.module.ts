import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './components/offers/offers.component';
import { OfferSuccessComponent } from './components/offer-success/offer-success.component';

@NgModule({
  declarations: [
    OffersComponent,
    OfferSuccessComponent
  ],
  imports: [
    SharedModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
