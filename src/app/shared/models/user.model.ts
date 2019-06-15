import { Landlord } from './landlord.model';
import { Tenant } from './tenant.model';
import { Apartment } from './apartment.model';
import { Feedback } from './feedback.model';

export type AccountTypes = 'landlord' | 'tenant';

export class User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: AccountTypes;
  landlord: Landlord;
  tenant: Tenant;
  apartments: Apartment[];
  feedback: Feedback[];
}
