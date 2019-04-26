import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OfferRoutingModule } from './offer-routing.module';
import { OffersComponent } from './components/offers/offers.component';
import { OfferSuccessComponent } from './components/offer-success/offer-success.component';
import { OfferComponent } from './components/offers/offer/offer.component';
import { OfferCreateComponent } from './components/offer-create/offer-create.component';
import { OfferCreateSuccessComponent } from './components/offer-create-success/offer-create-success.component';

@NgModule({
  declarations: [
    OffersComponent,
    OfferSuccessComponent,
    OfferComponent,
    OfferCreateComponent,
    OfferCreateSuccessComponent
  ],
  imports: [
    SharedModule,
    OfferRoutingModule
  ]
})
export class OfferModule { }
