import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AppConfirmService} from '../../../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../../../shared/services/app-loader/app-loader.service';
import { ActivatedRoute, Router } from '@angular/router';

import {RoomService} from '../../services/room.service';
import {egretAnimations} from '../../../../shared/animations/egret-animations';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  animations: egretAnimations
})
export class RoomsComponent implements OnInit {

  public items: any[];

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    try {
      const response = await this.roomService.getRooms();
      this.items = !response ? [] : response.rooms;
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
          await this.roomService.deleteRoom(row._id);
          this.getItems();
          this.loader.close();
          this.snack.open('Deleted!', 'OK', { duration: 4000 });
        }
      })
    ;
  }

}
