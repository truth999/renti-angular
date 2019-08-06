import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { ApartmentEditComponent } from './components/apartment-edit/apartment-edit.component';
import { RoomEditComponent } from './components/apartment-edit/room-edit/room-edit.component';

const routes: Routes = [
  { path: '', component: MyPropertiesComponent },
  {
    path: 'apartment/:id/edit',
    component: ApartmentEditComponent,
    children: [
      { path: 'room/:roomId/edit', component: RoomEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPropertiesRoutingModule { }
