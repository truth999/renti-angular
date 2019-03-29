import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';

@Injectable()
export class TokenService {

  constructor(
    private storageService: StorageService,
  ) { }

  get(): string {
    return this.storageService.get(this.getStorageKey());
  }

  save(token: string) {
    this.storageService.save(this.getStorageKey(), token);
  }

  destroyToken() {
    this.storageService.remove(this.getStorageKey());
  }

  private getStorageKey(): string {
    return 'token';
  }
}
