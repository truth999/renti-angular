import {SocialMediaAvailabilities} from '../../../shared/models/shared.model';

export class Offer {
  _id: string;
  rentalFee: number;
  overhead: number;
  minRentingTime: string;
  dateOfMovingIn: string;
  movingWith: boolean;
  typeOfTenants: string;
  socialMediaAvailabilities: SocialMediaAvailabilities;
  movingWithPets: boolean;
  whyChooseMe: string;
  tenantId: string;
}
