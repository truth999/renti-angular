import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxGalleryModule } from 'ngx-gallery';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../shared/shared.module';
import { RentalsRoutingModule } from './rentals-routing.module';

import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/apartment-detail/room-detail/room-detail.component';
import { SearchComponent } from './components/search/search.component';
import { SearchTenantComponent } from './components/search/search-tenant/search-tenant.component';
import { SearchApartmentComponent } from './components/search/search-apartment/search-apartment.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

import { RentalsService } from './services/rentals.service';

@NgModule({
  declarations: [
    ApartmentDetailComponent,
    RoomDetailComponent,
    SearchComponent,
    SearchTenantComponent,
    SearchApartmentComponent,
    FavoritesComponent
  ],
  providers: [
    RentalsService
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RentalsRoutingModule,
    NouisliderModule,
    NgxGalleryModule,
    GooglePlaceModule,
    NgSelectModule
  ]
})
export class RentalsModule { }
