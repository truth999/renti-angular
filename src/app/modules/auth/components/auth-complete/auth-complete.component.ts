import { Component, OnInit } from '@angular/core';

import { CONFIG_CONST } from '../../../../../config/config-const';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-auth-complete',
  templateUrl: './auth-complete.component.html',
  styleUrls: ['./auth-complete.component.scss']
})
export class AuthCompleteComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;

  accountType: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.accountType = params.accountType;
    });
  }

}
