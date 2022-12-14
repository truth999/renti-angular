import { User } from './user.model';
import { Offer } from './offer.model';
import { Feedback } from './feedback.model';
import { Apartment } from './apartment.model';

class Education {
  nameOfSchool: string;
  yearOfGraduation: number;
}

export class Tenant {
  _id: string;
  user: User;
  lookingRent: {
    address: string;
    location: {
      lat: number;
      lng: number;
    },
    addressTypes: any;
  };
  mobile: string;
  profilePicture: string;
  placeOfBirth: string;
  dateOfBirth: any;
  nationality: string;
  spokenLanguages: string[];
  currentCity: string;
  highestLevelOfQualification: string;
  education: Education[];
  jobTitle: string[];
  universitySpeciality: string;
  currentWorkplace: string;
  formerWorkplaces: string[];
  monthlyIncome: string;
  otherText: string;
  freeTextIntroduction: string;
  socialMediaAvailabilities: {
    facebook: string;
    linkedin: string;
    instagram: string
  };
  rank: number;
  offers: Offer[];
  feedback: Feedback[];
  favorites: Apartment[];
  status: string;
}
