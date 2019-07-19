import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})
export class DeleteAccountModalComponent implements OnInit {

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.modal.dismiss();
  }

}
