import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../../../../shared/models';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  @Input() user: User;
  uploadBase = environment.uploadBase;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
