export const config = {
  siteName: 'Renti',
  landlord: {
    perPage: 10,
  },
  availableLanguages: ['English', 'Hungarian', 'Russian', 'French'],
  nationalities: ['English', 'Hungarian', 'Spanish', 'Russian'],
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
