export const config = {
  siteName: 'Renti',
  availableLanguages: [{
    name: 'English',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'Magyar',
    code: 'hu',
    flag: 'flag-icon-hu'
  }],
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
