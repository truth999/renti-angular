import { User } from './user.model';

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
}
