import { Injectable } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Landlord} from "../models/landlord.model";

@Injectable()
export class LandlordService {

  constructor(
    private apiService: ApiService,
  ) { }

  getLandlords(page): Promise<any> {
    const url = `landlords?page=${page.pageNumber}&perPage=${page.perPage}`;
    return this.apiService.get(url);
  }

  getLandlord(_id: string): Promise<any> {
    return this.apiService.get(`landlords/${_id}`);
  }

  createLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.post(`landlords`, landlord);
  }

  updateLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.put(`landlords/${landlord._id}`, landlord);
  }

  deleteLandlord(_id: string): Promise<any> {
    return this.apiService.delete(`landlords/${_id}`);
  }
}
