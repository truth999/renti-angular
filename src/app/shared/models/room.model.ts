export class Room {
  _id: string;
  name: string;
  size: number;
  yearOfRenovation: number;
  coverage: string;
  equipment: boolean;
  furniture: [{
    furnitureName: string;
    furnitureType: string;
  }];
  pictures: string[];
  rank: number;
}
