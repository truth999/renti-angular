import {Feedback, LocationTemp, SocialMediaAvailabilities} from '../../../shared/models/shared.model';

export class Tenant {
  _id: string;
  firstName: string;
  lastName:  string;
  email: string;
  mobile: string;
  isPerson: string;
  nameOfAgency: string;
  profilePicture: string;
  placeOfBirth: LocationTemp;
  currentPlace: LocationTemp;
  nationality: string;
  highestLevelOfQualification: string;
  nameOfSchool: string;
  yearOfGraduation: number;
  jobTitle: string;
  universitySpeciality: string;
  currentWorkplace: string;
  formerWorkplaces: string[];
  monthlyIncome: number;
  spokenLanguage: string[];
  otherText: string;
  freeTextIntroduction: string;
  socialMediaAvailabilities: SocialMediaAvailabilities;
}
