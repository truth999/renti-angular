import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPropertiesComponent } from './components/my-properties/my-properties.component';

const routes: Routes = [
  { path: '', component: MyPropertiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPropertiesRoutingModule { }
