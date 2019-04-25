import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RentalsRoutingModule } from './rentals-routing.module';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    ApartmentDetailComponent,
    RoomDetailComponent,
    SearchComponent
  ],
  imports: [
    SharedModule,
    RentalsRoutingModule
  ]
})
export class RentalsModule { }
