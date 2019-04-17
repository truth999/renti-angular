import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private token: string;

  constructor() { }

  getToken() {
    return this.token;
  }
}
