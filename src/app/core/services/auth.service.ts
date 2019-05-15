import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { AuthRequest, SignupRequest } from '../../modules/auth/models/auth.model';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;

  constructor(
      private apiService: ApiService,
      private storageService: StorageService,
      private router: Router,
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUser(): Promise<any> {
    const userId = this.storageService.get('userId');
    return this.apiService.get(`users/${userId}`);
  }

  createUser(signupRequest: SignupRequest) {
    this.apiService.post('auth/signup', signupRequest)
        .then((response) => {
              this.successAuth(response);
            }
        );
  }

  login(authRequest: AuthRequest) {
    this.apiService.post('auth/login', authRequest)
        .then(response => {
              this.successAuth(response);
            }
        );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn <= 0) {
      this.logout();
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/auth/signin']);
  }

  private successAuth(response) {
    const token = response.token;
    this.token = token;
    if (token) {
      this.isAuthenticated = true;
      this.userId = response.userId;
      const now = new Date();
      const expirationDate = new Date(
          now.getTime() + response.expiresIn * 1000
      );
      this.saveAuthData(token, expirationDate, this.userId);
      this.router.navigate(['/auth/complete']);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    this.storageService.save('token', token);
    this.storageService.save('expiration', expirationDate.toISOString());
    this.storageService.save('userId', userId);
  }

  private clearAuthData() {
    this.storageService.remove('token');
    this.storageService.remove('expiration');
    this.storageService.remove('userId');
  }

  private getAuthData() {
    const token = this.storageService.get('token');
    const expirationDate = this.storageService.get('expiration');
    const userId = this.storageService.get('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
