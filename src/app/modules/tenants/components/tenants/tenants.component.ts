import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from "@angular/material";

import {Page} from '../../../../shared/models/shared.model';
import {AppConfirmService} from '../../../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../../../shared/services/app-loader/app-loader.service';
import {TenantService} from '../../services/tenant.service';
import {egretAnimations} from '../../../../shared/animations/egret-animations';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
  animations: egretAnimations
})
export class TenantsComponent implements OnInit {

  public items: any[];
  public page = new Page();

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private tenantService: TenantService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getItems();
  }

  async getItems() {
    try {
      const response = await this.tenantService.getTenants(this.page);
      this.items = !response ? [] : response.tenants;
      this.page.totalPages = !response ? 0 : response.totalPages;
    } finally {
    }
  }

  goDetail(id, isNew = false) {
    if (isNew) {
      this.router.navigate(['/tenants/new']);
    } else {
      this.router.navigate([`/tenants/${id}`]);
    }
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.firstName} ${row.lastName}?`})
      .subscribe(async (res) => {
        if (res) {
          this.loader.open();
          await this.tenantService.deleteTenant(row._id);
          this.getItems();
          this.loader.close();
          this.snack.open('Deleted!', 'OK', { duration: 4000 })
        }
      })
    ;
  }

}
