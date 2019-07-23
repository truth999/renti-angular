import { Tenant } from './tenant.model';
import { Apartment } from './apartment.model';

export class Offer {
  _id: string;
  rentalFee: number;
  minRentingTime: string;
  dateOfMovingIn: any;
  movingWith: string;
  movingWithPets: boolean;
  pets: string;
  whyChooseMe: string;
  tenant: Tenant;
  apartment: Apartment;
  accepted: boolean;
  landlordFeedback: boolean;
  tenantFeedback: boolean;
  feedbackReady: boolean;
}
