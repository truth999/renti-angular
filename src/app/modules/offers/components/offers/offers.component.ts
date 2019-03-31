import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppConfirmService} from '../../../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../../../shared/services/app-loader/app-loader.service';
import {OfferService} from '../../services/offer.service';
import {OfferDetailPopupComponent} from '../offer-detail-popup/offer-detail-popup.component';
import {Tenant} from '../../../tenants/models/tenant.model';
import {Page} from '../../../../shared/models/shared.model';
import {egretAnimations} from '../../../../shared/animations/egret-animations';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  animations: egretAnimations
})
export class OffersComponent implements OnInit {

  public items: any[];
  public page = new Page();
  public tenants: Tenant[] = [];

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private offerService: OfferService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getItems();
  }

  async getItems() {
    try {
      const promises = [
        this.offerService.getOffers(this.page),
        this.offerService.getTenants({page: 1})
      ];
      const [offerResponse, tenantResponse] = await Promise.all(promises);
      this.items = !offerResponse ? [] : offerResponse.offers;
      this.page.totalElements =  !offerResponse ? 0: offerResponse.totalElements;
      this.tenants = !tenantResponse ? [] : tenantResponse.tenants;
    } finally {
    }
  }

  openPopUp(offer: any = {}, isNew?) {
    let title = isNew ? 'Add new offer' : 'Update offer';
    let dialogRef: MatDialogRef<any> = this.dialog.open(OfferDetailPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: {offer, tenants: this.tenants}, isNew }
    });
    dialogRef.afterClosed()
      .subscribe(async (res) => {
        if(!res) {
          return;
        }
        this.loader.open();
        if (isNew) {
          await this.offerService.createOffer(res);
          this.getItems();
          this.loader.close();
          this.snack.open('Created!', 'OK', { duration: 4000 })
        } else {
          await this.offerService.updateOffer(res);
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
          await this.offerService.deleteOffer(row._id);
          this.getItems();
          this.loader.close();
          this.snack.open('Deleted!', 'OK', { duration: 4000 })
        }
      })
    ;
  }
}
