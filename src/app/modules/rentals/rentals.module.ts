import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxGalleryModule } from 'ngx-gallery';

import { SharedModule } from '../../shared/shared.module';
import { RentalsRoutingModule } from './rentals-routing.module';

import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { SearchComponent } from './components/search/search.component';

import { RentalsService } from './services/rentals.service';

@NgModule({
  declarations: [
    ApartmentDetailComponent,
    RoomDetailComponent,
    SearchComponent
  ],
  providers: [
    RentalsService
  ],
  imports: [
    SharedModule,
    RentalsRoutingModule,
    NouisliderModule,
    NgxGalleryModule
  ]
})
export class RentalsModule { }
