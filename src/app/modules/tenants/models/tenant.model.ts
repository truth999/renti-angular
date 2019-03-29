import {Feedback, PlaceOfBirth} from '../../../shared/models/shared.model';

export class Tenant {
  _id: string;
  firstName: String;
  lastName:  String;
  email: String;
  mobile: String;
  isPerson: String;
  nameOfAgency: String;
  profilePicture: String;
  placeOfBirth: PlaceOfBirth;
  spokenLanguage: String[];
}
