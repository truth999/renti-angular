export class Landlord {
  _id: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  mobile: string;
  profilePicture: string;
  placeOfBirth: {
    country: string,
    city: string
  };
  dateOfBirth: string;
  nationality: string;
  spokenLanguages: string[];
  isPerson: boolean;
  nameOfAgency: string;
}
