import { Landlord, Tenant } from '../models';

export const LANDLORD_PROFILES: Landlord = {
  _id: '',
  // firstName: 'Peter',
  // lastName: 'Kovacs',
  // email: '',
  mobile: '',
  profilePicture: '',
  placeOfBirth: {
    country: '',
    city: ''
  },
  dateOfBirth: '',
  nationality: 'US',
  spokenLanguages: ['English', 'Hungarian', 'Turkish', 'Russian', 'Italian'],
  isPerson: false,
  nameOfAgency: ''
};

export const TENANT_PROFILES: Tenant = {
  _id: '',
  // firstName: 'Kate',
  // lastName: 'Tomlins',
  // email: '',
  mobile: '',
  profilePicture: '',
  placeOfBirth: {
    country: '',
    city: ''
  },
  dateOfBirth: '',
  nationality: 'US',
  spokenLanguages: ['English', 'Spanish'],
  currentCity: {
    country: '',
    city: ''
  },
  highestLevelOfQualification: '',
  education: [{
    nameOfSchool: '',
    yearOfGraduation: 2019
  }],
  jobTitle: [],
  universitySpeciality: '',
  currentWorkplace: '',
  formerWorkplaces: [],
  monthlyIncome: '400-500k HUF',
  otherText: '',
  freeTextIntroduction: ''
};
