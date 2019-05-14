export class Tenant {
  // firstName: string;
  // lastName: string;
  // email: string;
  mobile: string;
  profilePicture: string;
  placeOfBirth: string;
  dateOfBirth: string;
  nationality: string;
  spokenLanguages: string[];
  currentCity: string;
  highestLevelOfQualification: string;
  education: [
    {
      nameOfSchool: string,
      yearOfGraduation: number
    }
  ];
  jobTitle: string[];
  universitySpeciality: string;
  currentWorkplace: string;
  formerWorkplaces: string[];
  monthlyIncome: string;
  otherInformation: string;
  freeTextIntroduction: string;
}
