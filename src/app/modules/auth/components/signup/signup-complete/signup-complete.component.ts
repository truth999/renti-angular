import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTypes } from '../../../../../shared/models';
import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-signup-complete',
  templateUrl: './signup-complete.component.html',
  styleUrls: ['./signup-complete.component.scss']
})
export class SignupCompleteComponent implements OnInit {

  @Input() accountType: string;

  AccountTypes = CONFIG_CONST.accountType;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToCreateApartment() {
    this.router.navigate(['/apartment-create']);
  }

  goToSearchApartment() {
    this.router.navigate(['/apartment-create']);
  }

}
