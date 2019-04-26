import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'apartment-detail', component: ApartmentDetailComponent },
  { path: 'room-detail', component: RoomDetailComponent },
  { path: 'my-properties', component: MyPropertiesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule { }
