import { Landlord } from './landlord.model';
import { Tenant } from './tenant.model';

export type AccountTypes = 'landlord' | 'tenant';

export class User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: AccountTypes;
  landlord: Landlord;
  tenant: Tenant;
}
