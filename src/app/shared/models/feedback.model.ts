import { User } from './user.model';

export class Feedback {
  _id: string;
  user: User;
  feedbackStar: number;
  feedbackText: string;
  updatedAt: string;
}
