import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HistoryDetailPopupComponent } from './components/history-detail-popup/history-detail-popup.component';
import { HistoriesComponent } from './components/histories/histories.component';
import { HistoryService } from './services/history.service';
import { RouterModule, Routes } from '@angular/router';

const historiesRoutes: Routes = [
  {
    path: '',
    component: HistoriesComponent,
    data: { title: 'Histories', breadcrumb: 'Histories' }
  }
];

@NgModule({
  declarations: [
    HistoryDetailPopupComponent,
    HistoriesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(historiesRoutes),
  ],
  providers: [
    HistoryService
  ],
  entryComponents: [
    HistoryDetailPopupComponent,
  ]
})
export class HistoryModule { }
