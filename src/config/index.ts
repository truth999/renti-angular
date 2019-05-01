import { CONFIG_CONST } from './config-const';

export const config = {
  siteName: 'Renti',
  supportedLanguages: [{
    name: 'English',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'Magyar',
    code: 'hu',
    flag: 'flag-icon-hu'
  }],
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
  apartment: {
    buildingTypes: ['brick', 'concrete', 'wooden'],
    energyPerformanceCertificateTypes: ['G', 'H', 'A', 'B'],
    stateOfApartmentValues: ['normal', 'new', 'refurbished'],
    buildingSitingValues: ['east', 'east-south', 'south', 'south-west', 'west', 'west-north', 'north', 'north-east'],
    heatingTypes: ['central', 'gas', 'electric'],
    allMediaServiceProviders: ['UPC', 'Digi', 'Telekom']
  },
  room: {
    windowTypes: ['plastic', 'normal', 'glass'],
    coverageValues: ['carpet', 'rock']
  }
};
