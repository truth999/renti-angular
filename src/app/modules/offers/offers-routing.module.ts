import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersComponent } from './components/offers/offers.component';
import { OfferSuccessComponent } from './components/offer-success/offer-success.component';

const routes: Routes = [
  { path: '', component: OffersComponent },
  { path: 'success', component: OfferSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
