import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/apartment-detail/room-detail/room-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  {
    path: 'apartment/:id',
    component: ApartmentDetailComponent,
    children: [
      { path: 'room/:roomId', component: RoomDetailComponent }
    ]
  },
  { path: 'favorites', component: FavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule { }
