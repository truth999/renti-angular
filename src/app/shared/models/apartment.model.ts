import { Room } from './room.model';

export class Apartment {
  address: string;
  typeOfBuilding: string;
  yearOfContruction: number;
  stateOfApartment: string;
  floorOfBuilding: number;
  floorOfApartment: number;
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
  externals: {
    balcony: boolean;
    garden: boolean;
    terrace: boolean;
  };
  sizeOfExternals: {
    balcony: number;
    garden: number;
    terrace: number;
  };
  airConditioner: boolean;
  garage: boolean;
  rentalFee: number;
  overhead: number;
  deposit: number;
  minimumRentingTime: number;
  dateOfMovingIn: string;
  rooms: Room[];
}
