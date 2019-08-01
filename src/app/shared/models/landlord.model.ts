import { User } from './user.model';
import { Apartment } from './apartment.model';
import { Feedback } from './feedback.model';

export class Landlord {
  _id: string;
  user: User;
  mobile: string;
  profilePicture: string;
  placeOfBirth: string;
  dateOfBirth: any;
  nationality: string[];
  spokenLanguages: string[];
  isPerson: boolean;
  nameOfAgency: string;
  apartments: Apartment[];
  feedback: Feedback[];
  status: string;
}
