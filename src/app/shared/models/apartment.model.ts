import { Room } from './room.model';
import { Landlord } from './landlord.model';
import { Offer } from './offer.model';

export class Apartment {
  _id: string;
  landlord: Landlord;
  name: string;
  address: {
    city: string;
    building: string;
    floor: string;
    door: string;
  };
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
  dateOfMovingIn: {
    rightNow: boolean;
    date: any;
  };
  pictures: string[];
  setAsPicture: string;
  windowType: string;
  furnished: boolean;
  draw: string;
  rank: number;
  rooms: Room[];
  offers: Offer[];
  checked: number;
  createdAt: string;
}
