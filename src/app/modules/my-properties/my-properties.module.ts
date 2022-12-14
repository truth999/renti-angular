import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxGalleryModule } from 'ngx-gallery';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';

import { MyPropertiesRoutingModule } from './my-properties-routing.module';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { ApartmentEditComponent } from './components/apartment-edit/apartment-edit.component';
import { RoomEditComponent } from './components/apartment-edit/room-edit/room-edit.component';

@NgModule({
  declarations: [
    MyPropertiesComponent,
    ApartmentEditComponent,
    RoomEditComponent
  ],
  providers: [],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MyPropertiesRoutingModule,
    NgxGalleryModule,
    NgSelectModule,
    GooglePlaceModule,
    ToastrModule
  ]
})
export class MyPropertiesModule { }
