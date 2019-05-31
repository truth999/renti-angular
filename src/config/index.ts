import { CONFIG_CONST } from './config-const';
import { environment } from '../environments/environment';

export const config = {
  siteName: 'Renti',
  siteColor: '#0b75e3',
  supportedLanguages: [
    {
      name: 'English',
      code: 'en',
      flag: 'flag-icon-us'
    },
    {
      name: 'Magyar',
      code: 'hu',
      flag: 'flag-icon-hu'
    },
    {
      name: 'Deutsch',
      code: 'de',
      flag: 'flag-icon-de'
    }
  ],
  signupSteps: {
    landlord: [
      CONFIG_CONST.signupSteps.TYPE_USERNAME,
      CONFIG_CONST.signupSteps.EMAIL_PRIVACY,
      CONFIG_CONST.signupSteps.PHONE_PASSWORD,
      CONFIG_CONST.signupSteps.BIRTH_NATIONALITY,
      CONFIG_CONST.signupSteps.PERSON_AGENCY,
      CONFIG_CONST.signupSteps.COMPLETE,
    ],
    tenant: [
      CONFIG_CONST.signupSteps.TYPE_USERNAME,
      CONFIG_CONST.signupSteps.EMAIL_PRIVACY,
      CONFIG_CONST.signupSteps.PHONE_PASSWORD,
      CONFIG_CONST.signupSteps.BIRTH_NATIONALITY,
      CONFIG_CONST.signupSteps.RENTAL_CITY,
      CONFIG_CONST.signupSteps.EDUCATION,
      CONFIG_CONST.signupSteps.OCCUPATION,
      CONFIG_CONST.signupSteps.OTHER_INSTRUCTION,
      CONFIG_CONST.signupSteps.COMPLETE,
    ]
  },
  spokenLanguages: [
    'Hungarian',
    'English',
    'Arabic',
    'Chinese',
    'French',
    'German',
    'Hindi',
    'Italian',
    'Japanese',
    'Romanian',
    'Russian',
    'Slovakian',
    'Spanish',
    'Other:'
  ],
  personAgency: ['Private person', 'Agency'],
  highestLevelOfQualification: ['Elementary School', 'Secondary School', 'University'],
  monthlyIncome: [
    '< 50,000',
    '50,000 - 100,000',
    '100,000 - 200,000',
    '200,000 - 400,000',
    '400,000 - 700,000',
    '700,000 - 1,000,000',
    '1,000,000+'
  ],
  apartment: {
    typeOfBuilding: ['Brick', 'Panel', 'Loam', 'Other'],
    stateOfApartment: ['New', 'Good', 'Normal', 'Renovation'],
    energyPerformanceCertificate: ['AA++', 'AA+', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ'],
    buildingSiting: ['East', 'West', 'North', 'South'],
    typeOfHeating: ['Gas-circo', 'Electric', 'Convector', 'Central', 'District heating', 'Mixed firing', 'Stove', 'Fireplace'],
    headroom: ['<2M', '2.0 - 2.5M', '2.5 - 3.0M', '>3M'],
    parking: ['At the street', 'In garage', 'At the yard', 'Not provided'],
    availableMediaServiceProviders: ['UPC', 'DIGI', 'Telekom', 'Other']
  },
  room: {
    coverage: ['Tiles', 'Laminated wooden', 'Carpet', 'Parquetry', 'Other'],
    windowType: ['Plastic', 'Wooden', 'Other']
  },
  excludeLoaderRoutes: [
    environment.apiBase + 'auth/login',
    environment.apiBase + 'auth/signup'
  ],
};
