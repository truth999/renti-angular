import { Component, Input, OnInit } from '@angular/core';

import { ConfirmModalService } from '../../../../../shared/services/modal/confirm-modal.service';

import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  @Input() type: string;
  @Input() accountId: string;
  AccountTypes = CONFIG_CONST.accountType;

  constructor(
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
  }

  onOpenConfirmModal() {
    const type = (this.type === this.AccountTypes.LANDLORD ? 'deleteLandlord' : 'deleteTenant');
    const result = {
      type,
      title: 'DELETE_MY_ACCOUNT',
      message: ['ACTION_NOT_REVERSIBLE', 'SURE_DELETE_ACCOUNT'],
      btnOk: 'DELETE',
      btnCancel: 'CANCEL',
      id: this.accountId
    };

    this.confirmModalService.show(result);
  }

}
