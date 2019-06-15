import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';
import { OfferRoutingModule } from './offer-routing.module';

import { OffersComponent } from './components/offers/offers.component';
import { OfferListComponent } from './components/offers/offer-list/offer-list.component';
import { OfferComponent} from './components/offers/offer-list/offer/offer.component';
import { OfferSuccessComponent} from './components/offer-success/offer-success.component';
import { OfferCreateComponent } from './components/offer-create/offer-create.component';
import { OfferCreateSuccessComponent } from './components/offer-create-success/offer-create-success.component';
import { MyOffersComponent } from './components/offers/my-offers/my-offers.component';

import { OfferService } from './services/offer.service';

@NgModule({
  declarations: [
    OffersComponent,
    OfferListComponent,
    OfferComponent,
    OfferSuccessComponent,
    OfferCreateComponent,
    OfferCreateSuccessComponent,
    MyOffersComponent,
  ],
  providers: [
    OfferService
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    OfferRoutingModule,
    ToastrModule
  ]
})
export class OfferModule { }
