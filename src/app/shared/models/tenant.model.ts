export class Tenant {
  _id: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  mobile: string;
  profilePicture: string;
  placeOfBirth: {
    country: string,
    city: string
  };
  dateOfBirth: string;
  nationality: string;
  spokenLanguages: string[];
  currentCity: {
    country: string,
    city: string
  };
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
