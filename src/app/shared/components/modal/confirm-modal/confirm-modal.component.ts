import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { MyPropertiesService } from '../../../../modules/my-properties/services/my-properties.service';
import { MyProfileService } from '../../../../modules/my-profile/services/my-profile.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() result: any;

  constructor(
    private modal: NgbActiveModal,
    private myPropertiesService: MyPropertiesService,
    private myProfileService: MyProfileService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.modal.dismiss();
  }

  async onDelete() {
    try {
      if (this.result.type === 'deleteApartment') {
        await this.myPropertiesService.deleteApartment(this.result.id);

        this.modal.dismiss();

        this.toastrService.success('The apartment is deleted successfully.', 'Success');

        this.router.navigate(['/app/my-properties']);
      }

      if (this.result.type === 'deleteLandlord') {
        await this.myProfileService.deleteLandlord(this.result.id);

        this.modal.dismiss();

        this.toastrService.success('Your account is deleted successfully.', 'Success');

        this.authService.logout();
      }

      if (this.result.type === 'deleteTenant') {
        await this.myProfileService.deleteTenant(this.result.id);

        this.modal.dismiss();

        this.toastrService.success('Your account is deleted successfully.', 'Success');

        this.authService.logout();
      }
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');

      console.log('ConfirmModalComponent->onDelete');
    }
  }

}
