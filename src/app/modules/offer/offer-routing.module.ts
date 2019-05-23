import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersComponent } from './components/offers/offers.component';
import { OfferCreateComponent } from './components/offer-create/offer-create.component';
import { OfferCreateSuccessComponent } from './components/offer-create-success/offer-create-success.component';
import { OfferSuccessComponent } from './components/offer-success/offer-success.component';

const routes: Routes = [
  { path: '', component: OffersComponent },
  { path: ':id/success', component: OfferSuccessComponent },
  { path: 'create/:id', component: OfferCreateComponent },
  { path: 'create-success', component: OfferCreateSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
