import { Component, OnInit } from '@angular/core';

import { ConfirmModalService } from '../../../../../shared/services/modal/confirm-modal.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
  }

  onOpenConfirmModal() {
    const result = {
      title: 'DELETE_MY_ACCOUNT',
      message: ['ACTION_NOT_REVERSIBLE', 'SURE_DELETE_ACCOUNT'],
      btnOk: 'DELETE',
      btnCancel: 'CANCEL'
    };

    this.confirmModalService.show(result);
  }

}
