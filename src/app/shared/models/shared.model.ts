export class Feedback {
  numberOfFeedback: number;
  averageOfFeedback: number;
  feedbackStars: number[];
  feedbackTexts: string[];
}

export class LocationTemp {
  country: String;
  city: String;
}

export class SocialMediaAvailabilities {
  facebook: string;
  linkedIn: string;
  twitter: string
}

export class Page {
  perPage: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  pageNumber: number = 0;
}
