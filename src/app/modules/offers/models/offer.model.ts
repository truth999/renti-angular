import {SocialMediaAvailabilities} from '../../../shared/models/shared.model';

export class Offer {
  rentalFee: number;
  overhead: number;
  minRentingTime: number;
  dateOfMovingIn: string;
  movingWith: boolean;
  typeOfTenants: string;
  socialMediaAvailabilities: SocialMediaAvailabilities
  movingWithPets: boolean;
  whyChooseMe: string;
}
