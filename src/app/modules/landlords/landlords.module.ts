import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { LandlordsComponent } from './components/landlords/landlords.component';
import {LandlordsRoutes} from "./landlords.routing";
import {LandlordDetailPopupComponent} from "./components/landlord-detail-popup/landlord-detail-popup.component";
import {LandlordService} from "./services/landlord.service";
import {LandlordDetailComponent} from "./components/landlord-detail/landlord-detail.component";

@NgModule({
  declarations: [
    LandlordsComponent,
    LandlordDetailComponent,
    LandlordDetailPopupComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(LandlordsRoutes),
    FileUploadModule,
  ],
  providers: [
    LandlordService
  ],
  entryComponents: [
    LandlordDetailPopupComponent,
  ]
})
export class LandlordsModule { }
