import {Feedback, LocationTemp, SocialMediaAvailabilities} from '../../../shared/models/shared.model';

export class Tenant {
  _id: string;
  firstName: string;
  lastName:  string;
  email: string;
  mobile: string;
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
  spokenLanguages: string[];
  otherText: string;
  freeTextIntroduction: string;
  socialMediaAvailabilities: SocialMediaAvailabilities;
}
