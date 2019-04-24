import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RentalsRoutingModule } from './rentals-routing.module';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';

@NgModule({
  declarations: [
    ApartmentDetailComponent,
    RoomDetailComponent
  ],
  imports: [
    SharedModule,
    RentalsRoutingModule
  ]
})
export class RentalsModule { }
