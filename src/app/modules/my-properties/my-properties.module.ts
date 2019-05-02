import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MyPropertiesRoutingModule } from './my-properties-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { ApartmentEditComponent } from './components/apartment-edit/apartment-edit.component';
import { RoomEditComponent } from './components/room-edit/room-edit.component';

@NgModule({
  declarations: [
    MyPropertiesComponent,
    ApartmentEditComponent,
    RoomEditComponent
  ],
  imports: [
    SharedModule,
    MyPropertiesRoutingModule,
    NgxGalleryModule
  ]
})
export class MyPropertiesModule { }
