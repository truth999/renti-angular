import { Landlord, Tenant } from '../models';

export const LANDLORD_PROFILES: Landlord = {
  firstName: 'Peter',
  lastName: 'Kovacs',
  email: '',
  phone: '',
  birthPlace: '',
  birthDate: '',
  nationality: 'US',
  spokenLanguages: ['English', 'Hungarian', 'Turkish', 'Russian', 'Italian'],
  personInfo: '',
  agencyName: ''
};

export const TENANT_PROFILES: Tenant = {
  firstName: 'Kate',
  lastName: 'Tomlins',
  email: '',
  phone: '',
  birthPlace: '',
  birthDate: '',
  nationality: 'US',
  spokenLanguages: ['English', 'Spanish'],
  currentCity: '',
  highestLevel: '',
  schoolName: ['University of Debrecen'],
  graduationYear: [],
  jobTitle: [],
  speciality: '',
  currentWorkplace: '',
  formerWorkplaces: [],
  monthlyIncome: '400-500k HUF',
  otherInformation: 'I usually like lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  freeTextIntroduction: 'I’d like to rent a lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'
};
