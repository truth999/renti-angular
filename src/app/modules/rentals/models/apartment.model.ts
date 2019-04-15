export class Externals {
  balcony: boolean;
  garden: boolean;
  terrace: boolean;
}

export class SizeOfExternals {
  balcony: number;
  garden: number;
  terrace: number;
}

export class Apartment {
  _id: string;
  address: string;
  typeOfBuilding: string;
  yearOfConstruction: number;
  stateOfApartment: string;
  energyPerformanceCertificate: string;
  floorsOfBuilding: number;
  floorsOfApartment: number;
  size: number;
  elevator: boolean;
  rooftop: boolean;
  buildingSiting: string;
  typeOfHeating: string;
  headroom: number;
  parking: boolean;
  childFriendly: boolean;
  petFriendly: boolean;
  externalIsolation: boolean;
  mediaServiceProviders: string[];
  handicapAccessible: boolean;
  externals: Externals;
  sizeOfExternals: SizeOfExternals;
  airConditioner: boolean;
  garage: boolean;
  rentalFee: number;
  overhead: number;
  deposit: number;
  minimumRentingTime: number;
  dateOfMovingIn: string;
  rooms: string[];
}
