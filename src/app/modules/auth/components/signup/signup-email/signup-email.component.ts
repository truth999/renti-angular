import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-email',
  templateUrl: './signup-email.component.html',
  styleUrls: ['./signup-email.component.scss']
})
export class SignupEmailComponent implements OnInit {
  password = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';

  constructor() { }

  ngOnInit() {
  }

}
