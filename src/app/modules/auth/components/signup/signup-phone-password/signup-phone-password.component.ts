import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-phone-password',
  templateUrl: './signup-phone-password.component.html',
  styleUrls: ['./signup-phone-password.component.scss']
})
export class SignupPhonePasswordComponent implements OnInit {
  password = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';
  phone: string;

  constructor() { }

  ngOnInit() {
  }

}
