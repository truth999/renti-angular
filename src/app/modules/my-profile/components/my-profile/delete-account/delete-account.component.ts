import { Component, OnInit } from '@angular/core';

import { DeleteAccountModalService } from '../../../services/modal/delete-account-modal.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    private deleteAccountModalService: DeleteAccountModalService
  ) { }

  ngOnInit() {
  }

  onOpenDeleteAccountModal() {
    this.deleteAccountModalService.show();
  }

}
