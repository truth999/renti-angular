import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RentalsRoutingModule } from './rentals-routing.module';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SearchComponent } from './components/search/search.component';
import { NouisliderModule } from 'ng2-nouislider';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';

@NgModule({
  declarations: [
    ApartmentDetailComponent,
    RoomDetailComponent,
    SearchComponent,
    MyPropertiesComponent
  ],
  imports: [
    SharedModule,
    RentalsRoutingModule,
    NouisliderModule
  ]
})
export class RentalsModule { }
