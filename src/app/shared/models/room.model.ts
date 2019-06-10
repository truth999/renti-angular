import { Apartment } from './apartment.model';

export class Room {
  _id: string;
  apartment: Apartment;
  name: string;
  size: number;
  yearOfRenovation: number;
  coverage: string;
  windowType: string;
  equipment: boolean;
  furniture: [{
    furnitureName: string;
    furnitureType: string;
  }];
  pictures: string[];
  dataPercent: number;
}
