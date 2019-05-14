import { Landlord, Tenant } from '../models';

export const LANDLORD_PROFILES: Landlord = {
  // firstName: 'Peter',
  // lastName: 'Kovacs',
  // email: '',
  mobile: '',
  profilePicture: '',
  placeOfBirth: '',
  dateOfBirth: '',
  nationality: 'US',
  spokenLanguages: ['English', 'Hungarian', 'Turkish', 'Russian', 'Italian'],
  isPerson: false,
  nameOfAgency: ''
};

export const TENANT_PROFILES: Tenant = {
  // firstName: 'Kate',
  // lastName: 'Tomlins',
  // email: '',
  mobile: '',
  profilePicture: '',
  placeOfBirth: '',
  dateOfBirth: '',
  nationality: 'US',
  spokenLanguages: ['English', 'Spanish'],
  currentCity: '',
  highestLevelOfQualification: '',
  education: [
    {
      nameOfSchool: '',
      yearOfGraduation: 2019
    }
  ],
  jobTitle: [],
  universitySpeciality: '',
  currentWorkplace: '',
  formerWorkplaces: [],
  monthlyIncome: '400-500k HUF',
  otherInformation: '',
  freeTextIntroduction: ''
};
