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

import { RoomEditComponent } from './components/room-edit/room-edit.component';
import { MyPropertiesService } from './services/my-properties.service';

@NgModule({
  declarations: [
    MyPropertiesComponent,
    ApartmentEditComponent,
    RoomEditComponent
  ],
  providers: [
    MyPropertiesService
  ],
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
