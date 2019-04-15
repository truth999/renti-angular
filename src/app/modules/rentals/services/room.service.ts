import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Room} from '../models/room.model';

@Injectable()
export class RoomService {

  private roomUrl = 'rooms';

  constructor(
    private apiService: ApiService,
  ) { }

  getRooms(): Promise<any> {
    return this.apiService.get(this.roomUrl);
  }

  getRoom(id: string): Promise<any> {
    return this.apiService.get(`${this.roomUrl}/${id}`);
  }

  createRoom(room: Room): Promise<any> {
    return this.apiService.post(this.roomUrl, room);
  }

  updateRoom(room: Room): Promise<any> {
    return this.apiService.put(`${this.roomUrl}/${room._id}`, room);
  }

  deleteRoom(id: string): Promise<any> {
    return this.apiService.delete(`${this.roomUrl}/${id}`);
  }
}
