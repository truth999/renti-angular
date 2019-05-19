import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed = false;

  constructor(
      private authService: AuthService,
      private cursorWaitService: CursorWaitService,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  async login() {
    try {
      this.cursorWaitService.enable();
      this.loginFailed = false;
      const loginData = this.loginForm.value;
      await this.authService.login(loginData);
    } catch (e) {
      this.loginFailed = true;
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
