export class Furniture {
  names: string[];
  types: string[];
}

export class Room {
  _id: string;
  name: string;
  size: number;
  yearOfRenovation: number;
  coverage: string;
  windowType: string;
  equipment: boolean;
  furniture: Furniture;
  pictures: string[];
}
