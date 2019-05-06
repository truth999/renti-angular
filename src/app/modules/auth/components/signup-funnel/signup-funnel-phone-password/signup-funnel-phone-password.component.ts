import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-funnel-phone-password',
  templateUrl: './signup-funnel-phone-password.component.html',
  styleUrls: ['./signup-funnel-phone-password.component.scss']
})
export class SignupFunnelPhonePasswordComponent implements OnInit {
  password = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';
  phone: string;

  constructor() { }

  ngOnInit() {
  }

}
