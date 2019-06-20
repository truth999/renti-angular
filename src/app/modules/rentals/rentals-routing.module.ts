import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { ApartmentDetailComponent } from './components/apartment-detail/apartment-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'apartment/:id', component: ApartmentDetailComponent },
  { path: 'room/:id', component: RoomDetailComponent },
  { path: 'favorites', component: FavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule { }
