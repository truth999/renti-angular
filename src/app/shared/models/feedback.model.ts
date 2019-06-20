import { Landlord } from './landlord.model';
import { Tenant } from './tenant.model';

export class Feedback {
  _id: string;
  landlord: Landlord;
  tenant: Tenant;
  feedbackStar: number;
  feedbackText: string;
  updatedAt: string;
}
