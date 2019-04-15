import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../shared/models/shared.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../../shared/services/app-loader/app-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { egretAnimations } from '../../../../shared/animations/egret-animations';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
  animations: egretAnimations
})
export class ApartmentsComponent implements OnInit {

  public items: any[];
  public page = new Page();

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private apartmentService: ApartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getItems();
  }

  async getItems() {
    try {
      const response = await this.apartmentService.getApartments(this.page);
      this.items = !response ? [] : response.apartments;
      this.page.totalPages = !response ? 0 : response.totalPages;
    } finally {
    }
  }

  goDetail(id, isNew = false) {
    if (isNew) {
      this.router.navigate(['new'], {relativeTo: this.route});
    } else {
      this.router.navigate([id], {relativeTo: this.route});
    }
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.firstName} ${row.lastName}?`})
      .subscribe(async (res) => {
        if (res) {
          this.loader.open();
          await this.apartmentService.deleteApartment(row._id);
          this.getItems();
          this.loader.close();
          this.snack.open('Deleted!', 'OK', { duration: 4000 })
        }
      })
    ;
  }
}
