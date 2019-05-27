import { User } from './user.model';

export class Tenant {
  _id: string;
  user: User;
  lookingRent: string;
  mobile: string;
  profilePicture: string;
  placeOfBirth: string;
  dateOfBirth: string;
  nationality: string;
  spokenLanguages: string[];
  currentCity: string;
  highestLevelOfQualification: string;
  education: [{
    nameOfSchool: string,
    yearOfGraduation: number
  }];
  jobTitle: string[];
  universitySpeciality: string;
  currentWorkplace: string;
  formerWorkplaces: string[];
  monthlyIncome: string;
  otherText: string;
  freeTextIntroduction: string;
}
