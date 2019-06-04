import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { CONFIG_CONST } from '../../../../../config/config-const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;

  loginForm: FormGroup;
  loginFailed = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cursorWaitService: CursorWaitService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        this.cursorWaitService.enable();
        this.loginFailed = false;
        const loginData = this.loginForm.value;
        await this.authService.login(loginData);
        this.router.navigate(['/app/rentals/search']);
      } catch (e) {
        this.loginFailed = true;
      } finally {
        this.cursorWaitService.disable();
      }
    } else {
      this.validateFormFieldsService.validate(this.loginForm);
    }
  }

}
