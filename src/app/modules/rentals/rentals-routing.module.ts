import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';

const routes: Routes = [
  { path: 'apartment-detail', component: ApartmentDetailComponent },
  { path: 'room-detail', component: RoomDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule { }
