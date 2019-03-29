import { Routes } from '@angular/router';
import {LandlordsComponent} from "./components/landlords/landlords.component";

export const LandlordsRoutes: Routes = [
  {
    path: '',
    component: LandlordsComponent,
    data: { title: 'Landlords', breadcrumb: 'landlords' }
  }
];
