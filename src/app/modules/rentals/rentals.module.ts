import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ApartmentsComponent } from './components/apartments/apartments.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { ApartmentService } from './services/apartment.service';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { RoomService } from './services/room.service';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

const rentalsRoutes: Routes = [
  {
    path: 'apartments',
    component: ApartmentsComponent,
    data: { title: 'Apartments', breadcrumb: 'Apartments' }
  },
  {
    path: 'apartments/new',
    component: ApartmentDetailComponent,
    data: { title: 'New Apartment', breadcrumb: 'New' }
  },
  {
    path: 'apartments/:id',
    component: ApartmentDetailComponent,
    data: { title: 'Apartment Detail', breadcrumb: 'Details' }
  },
  {
    path: 'rooms',
    component: RoomsComponent,
    data: { title: 'Rooms', breadcrumb: 'Rooms' }
  },
  {
    path: 'rooms/new',
    component: RoomDetailComponent,
    data: { title: 'New Room', breadcrumb: 'Rooms' }
  },
  {
    path: 'rooms/:id',
    component: RoomDetailComponent,
    data: { title: 'Room Detail', breadcrumb: 'New' }
  }
];


@NgModule({
  declarations: [
    ApartmentsComponent,
    ApartmentDetailComponent,
    RoomsComponent,
    RoomDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(rentalsRoutes),
  ],
  providers: [
    ApartmentService,
    RoomService,
  ]
})
export class RentalsModule { }
