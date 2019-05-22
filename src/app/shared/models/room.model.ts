export class Room {
  _id: string;
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
}
