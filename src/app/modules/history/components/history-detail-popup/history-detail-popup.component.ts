import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-history-detail-popup',
  templateUrl: './history-detail-popup.component.html',
  styleUrls: ['./history-detail-popup.component.scss']
})
export class HistoryDetailPopupComponent implements OnInit {

  item: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<HistoryDetailPopupComponent>,
  ) { }

  ngOnInit() {
    this.item = this.data.payload;
  }

}
