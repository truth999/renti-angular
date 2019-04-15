import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import { History } from '../models/history.model';

@Injectable()
export class HistoryService {

  constructor(
    private apiService: ApiService,
  ) { }

  getHistories(page): Promise<any> {
    const url = `history?page=${page.pageNumber}&perPage=${page.perPage}`;
    return this.apiService.get(url);
  }

  getHistory(_id: string): Promise<any> {
    return this.apiService.get(`history/${_id}`);
  }

  getHistoryDetail(history: History) {
    const type = history.type.toLowerCase();
    const apiUrl = `${this.makeTypeApiUrl(type)}/${history.typeId}`;
    return this.apiService.get(apiUrl).then(response => response[type]);
  }

  private makeTypeApiUrl(type) {
    switch (type.toLowerCase()) {
      case 'offer':
        return `offers`;
      case 'apartment':
        return `apartments`;
      case 'user':
        return `users`;
      default:
          return 'history';
    }
  }
}
