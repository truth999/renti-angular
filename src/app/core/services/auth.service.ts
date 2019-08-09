import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ApiService } from './api.service';
import { StorageService } from './storage.service';

import { AuthRequest, SignupRequest } from '../../modules/auth/models/auth.model';

import { CONFIG_CONST } from '../../../config/config-const';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private AccountTypes = CONFIG_CONST.accountType;

  constructor(
      private apiService: ApiService,
      private storageService: StorageService,
      private router: Router,
      private route: ActivatedRoute,
      private translateService: TranslateService
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

  getAuthUser(): Promise<any> {
    const userId = this.storageService.get('userId');
    return this.apiService.get(`users/${userId}`);
  }

  getUser(id: string): Promise<any> {
    return this.apiService.get(`users/${id}`);
  }

  getLandlord(id: string): Promise<any> {
    return this.apiService.get(`landlords/${id}`);
  }

  getTenant(id: string, page?): Promise<any> {
    const url = typeof page === 'undefined'
      ? `tenants/${id}`
      : `tenants/${id}?page=${page.pageNumber}&perPage=${page.perPage}`;
    return this.apiService.get(url);
  }

  createUser(signupRequest: SignupRequest) {
    return this.apiService.post('auth/signup', signupRequest);
  }

  login(authRequest: AuthRequest) {
    return this.apiService.post('auth/login', authRequest)
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

  logout(redirectUrl?) {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/login'], { queryParams: { redirectUrl } });
  }

  forgotPassword(email: { email: string }): Promise<any> {
    return this.apiService.post('auth/forgot', email);
  }

  resetPasssword(token: string, password: { password: string }): Promise<any> {
    return this.apiService.post(`auth/reset/${token}`, password);
  }

  private successAuth(response) {
    const token = response.token;
    const accountType = response.accountType;
    this.token = token;
    if (token) {
      this.isAuthenticated = true;
      this.userId = response.userId;
      const landlordId = response.landlordId;
      const tenantId = response.tenantId;
      const now = new Date();
      const expirationDate = new Date(
          now.getTime() + response.expiresIn * 1000
      );
      const redirectUrl = this.route.snapshot.queryParams.redirectUrl;
      this.saveAuthData(token, expirationDate, this.userId, landlordId, tenantId);
      if (response.language) {
        this.translateService.use(response.language);
      }
      if (!!redirectUrl) {
        this.router.navigateByUrl(redirectUrl);
      } else {
        if (accountType === this.AccountTypes.LANDLORD) {
          this.router.navigate(['/app/my-properties']);
        }
        if (accountType === this.AccountTypes.TENANT) {
          this.router.navigate(['app/rentals/search']);
        }
      }
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, landlordId: string, tenantId: string) {
    this.storageService.save('token', token);
    this.storageService.save('expiration', expirationDate.toISOString());
    this.storageService.save('userId', userId);
    this.storageService.save('landlordId', landlordId);
    this.storageService.save('tenantId', tenantId);
  }

  private clearAuthData() {
    this.storageService.remove('token');
    this.storageService.remove('expiration');
    this.storageService.remove('userId');
    this.storageService.remove('landlordId');
    this.storageService.remove('tenantId');
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
