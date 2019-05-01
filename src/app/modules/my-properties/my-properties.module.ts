import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MyPropertiesRoutingModule } from './my-properties-routing.module';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';

@NgModule({
  declarations: [MyPropertiesComponent],
  imports: [
    SharedModule,
    MyPropertiesRoutingModule
  ]
})
export class MyPropertiesModule { }
