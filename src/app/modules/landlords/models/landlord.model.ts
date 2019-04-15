import {Feedback, LocationTemp} from '../../../shared/models/shared.model';

export class Landlord {
  _id: string;
  firstName: string;
  lastName:  string;
  email: string;
  mobile: string;
  isPerson: string;
  nameOfAgency: string;
  profilePicture: string;
  nationality: string;
  placeOfBirth: LocationTemp;
  spokenLanguages: string[];
}
