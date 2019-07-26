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
  user: {
    spokenLanguages: {
      hungarian: 'COMMON.HUNGARIAN',
      english: 'COMMON.ENGLISH',
      arabic: 'COMMON.ARABIC',
      chinese: 'COMMON.CHINESE',
      french: 'COMMON.FRENCH',
      german: 'COMMON.GERMAN',
      hindi: 'COMMON.HINDI',
      italian: 'COMMON.ITALIAN',
      japanese: 'COMMON.JAPANESE',
      romanian: 'COMMON.ROMANIAN',
      russian: 'COMMON.RUSSIAN',
      slovakian: 'COMMON.SLOVAKIAN',
      spanish: 'COMMON.SPANISH',
      other: 'COMMON.OTHER'
    },
    personAgency: {
      true: 'COMMON.PRIVATE_PERSON',
      false: 'COMMON.AGENCY'
    },
    highestLevelOfQualification: {
      elementary_school: 'COMMON.ELEMENTARY_SCHOOL',
      secondary_school: 'COMMON.SECONDARY_SCHOOL',
      university: 'COMMON.UNIVERSITY'
    },
    monthlyIncome: {
      1: '< 50,000',
      50000: '50,000 - 100,000',
      100000: '100,000 - 200,000',
      200000: '200,000 - 400,000',
      400000: '400,000 - 700,000',
      700000: '700,000 - 1,000,000',
      1000000: '1,000,000+'
    }
  },
  apartment: {
    typeOfBuilding: {
      brick: 'APARTMENT.BRICK',
      panel: 'APARTMENT.PANEL',
      loam: 'APARTMENT.LOAM',
      other: 'COMMON.OTHER'
    },
    stateOfApartment: {
      new: 'COMMON.NEW',
      newish: 'COMMON.NEWISH',
      renovated: 'COMMON.RENOVATED',
      good: 'COMMON.GOOD',
      average: 'COMMON.AVERAGE',
      need_renovation: 'COMMON.NEED_RENOVATION'
    },
    energyPerformanceCertificate: {
      aapp: 'AA++',
      aap: 'AA+',
      aa: 'AA',
      bb: 'BB',
      cc: 'CC',
      dd: 'DD',
      ee: 'EE',
      ff: 'FF',
      gg: 'GG',
      hh: 'HH',
      ii: 'II',
      jj: 'JJ'
    },
    buildingSiting: {
      east: 'COMMON.EAST',
      west: 'COMMON.WEST',
      north: 'COMMON.NORTH',
      south: 'COMMON.SOUTH',
      north_west: 'COMMON.NORTH_WEST',
      north_east: 'COMMON.NORTH_EAST',
      south_west: 'COMMON.SOUTH_WEST',
      south_east: 'COMMON.SOUTH_EAST'
    },
    typeOfHeating: {
      gas_circo: 'COMMON.GAS_CIRCO',
      electric: 'COMMON.ELECTRIC',
      convector: 'COMMON.CONVECTOR',
      central: 'COMMON.CENTRAL',
      district_heating: 'COMMON.DISTRICT_HEATING',
      mixed_firing: 'COMMON.MIXED_FIRING',
      stove: 'COMMON.STOVE',
      fireplace: 'COMMON.FIREPLACE'
    },
    headroom: {
      1: '<2M',
      2: '2.0 - 2.5M',
      2.5: '2.5 - 3.0M',
      3: '>3M',
    },
    parking: {
      at_the_street: 'COMMON.AT_THE_STREET',
      in_garage: 'COMMON.IN_GARAGE',
      at_the_yard: 'COMMON.AT_THE_YARD',
      not_provided: 'COMMON.NOT_PROVIDED',
    },
    windowType: {
      plastic: 'COMMON.PLASTIC',
      wooden: 'COMMON.WOODEN',
      other: 'COMMON.OTHER',
    },
    availableMediaServiceProviders: {
      upc: 'COMMON.UPC',
      digi: 'COMMON.DIGI',
      telekom: 'COMMON.TELEKOM',
      other: 'COMMON.OTHER',
    }
  },
  room: {
    coverage: {
      titles: 'COMMON.TILES',
      laminated_wooden: 'COMMON.LAMINATED_WOODEN',
      carpet: 'COMMON.CARPET',
      parquetry: 'COMMON.PARQUETRY',
      other: 'COMMON.OTHER',
    }
  },
  offer: {
    minRentingTime: {
      1: ['1', 'COMMON.MONTH'],
      3: ['3', 'COMMON.MONTHS'],
      6: ['6', 'COMMON.MONTHS'],
      12: ['12+', 'COMMON.MONTHS'],
      24: ['24+', 'COMMON.MONTHS']
    }
  },
  excludeLoaderRoutes: [
    environment.apiBase + 'auth/login',
    environment.apiBase + 'auth/signup',
    environment.apiBase + 'apartments/check-address',
    environment.apiBase + 'map/default',
    environment.apiBase + 'map/tenants',
    environment.apiBase + 'map/apartments'
  ],
};
