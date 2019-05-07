import { Injectable } from '@angular/core';
import LocalStorageService from './local-storage.service';

@Injectable()
export class StorageService {

  private storage;

  constructor() {
    this.storage = new LocalStorageService();
  }

  get(...args) {
    return this.storage.get(...args);
  }

  save(...args) {
    return this.storage.save(...args);
  }

  remove(...args) {
    return this.storage.remove(...args);
  }

  clear(...args) {
    return this.storage.clear(...args);
  }
}
