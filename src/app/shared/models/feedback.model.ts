import { Landlord } from './landlord.model';
import { Tenant } from './tenant.model';

export class Feedback {
  _id: string;
  landlord: Landlord;
  tenant: Tenant;
  feedbackStar: {
    availability: number;
    communication: number;
    cooperation: number;
    professionalism: number;
    recommend: number;
    overall: number;
  };
  feedbackText: string;
  updatedAt: string;
}
