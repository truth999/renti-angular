import { Room } from './room.model';

export class Apartment {
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
  headroom: string;
  parking: string;
  childFriendly: boolean;
  petFriendly: boolean;
  externalIsolation: boolean;
  mediaServiceProviders: string[];
  handicapAccessible: boolean;
  balcony: boolean;
  sizeOfBalcony: number;
  garden: boolean;
  sizeOfGarden: number;
  terrace: boolean;
  sizeOfTerrace: number;
  airConditioner: boolean;
  garage: boolean;
  rentalFee: number;
  overhead: number;
  deposit: number;
  minimumRentingTime: number;
  dateOfMovingIn: string;
  rooms: string[];
}
