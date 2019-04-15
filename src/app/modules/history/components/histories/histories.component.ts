import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { HistoryService } from '../../services/history.service';
import {Page} from '../../../../shared/models/shared.model';
import {egretAnimations} from '../../../../shared/animations/egret-animations';
import { HistoryDetailPopupComponent } from '../history-detail-popup/history-detail-popup.component';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
  animations: egretAnimations
})
export class HistoriesComponent implements OnInit {

  public items: any[];
  public page = new Page();

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private historyService: HistoryService,
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getItems();
  }

  async getItems() {
    try {
      const response = await this.historyService.getHistories(this.page);
      this.items = !response ? [] : response.histories;
      this.page.totalElements =  !response ? 0 : response.totalElements;
    } finally {
    }
  }

  async openPopUp(history: any = {}) {
    const title = 'History Detail';
    const historyDetails = await this.historyService.getHistoryDetail(history);
    const dialogRef: MatDialogRef<any> = this.dialog.open(HistoryDetailPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: historyDetails }
    });
  }

}
