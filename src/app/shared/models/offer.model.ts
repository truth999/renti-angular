import { User } from './user.model';
import { Apartment } from './apartment.model';

export class Offer {
  _id: string;
  user: User;
  apartment: Apartment;
  rentalFee: number;
  overhead: number;
  minRentingTime: number;
  dateOfMovingIn: any;
  movingWith: string;
  movingWithPets: boolean;
  pets: string;
  whyChooseMe: string;
  accepted: boolean;
  feedback: boolean;
}
