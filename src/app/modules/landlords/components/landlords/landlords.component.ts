import { Component, OnInit } from '@angular/core';
import {AppLoaderService} from "../../../../shared/services/app-loader/app-loader.service";
import {AppConfirmService} from "../../../../shared/services/app-confirm/app-confirm.service";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {LandlordService} from "../../services/landlord.service";
import {LandlordDetailPopupComponent} from "../landlord-detail-popup/landlord-detail-popup.component";
import {Page} from "../../../../shared/models/shared.model";
import {config} from "../../../../../config";
import {egretAnimations} from "../../../../shared/animations/egret-animations";

@Component({
  selector: 'app-landlords',
  templateUrl: './landlords.component.html',
  styleUrls: ['./landlords.component.scss'],
  animations: egretAnimations
})
export class LandlordsComponent implements OnInit {

  public items: any[];
  public page = new Page();

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private landlordService: LandlordService,
  ) { }

  ngOnInit() {
    this.page.perPage = config.landlord.perPage;
    this.page.pageNumber = 1;

    this.getItems();
  }

  async getItems() {
    try {
      const response = await this.landlordService.getLandlords(this.page);
      this.items = response.landlords;
      this.page.totalPages = response.totalPages;
      this.page.totalElements = response.totalElements;
    } finally {
    }
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new landlord' : 'Update landlord';
    let dialogRef: MatDialogRef<any> = this.dialog.open(LandlordDetailPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, isNew }
    });
    dialogRef.afterClosed()
      .subscribe(async (res) => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          await this.landlordService.createLandlord(res);
          this.getItems();
          this.loader.close();
          this.snack.open('Created!', 'OK', { duration: 4000 })
        } else {
          await this.landlordService.updateLandlord(res);
          this.getItems();
          this.loader.close();
          this.snack.open('Updated!', 'OK', { duration: 4000 })
        }
      })
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.firstName} ${row.lastName}?`})
      .subscribe(async (res) => {
        if (res) {
          this.loader.open();
          await this.landlordService.deleteLandlord(row._id);
          this.getItems();
          this.loader.close();
          this.snack.open('Deleted!', 'OK', { duration: 4000 })
        }
      })
    ;
  }

}
