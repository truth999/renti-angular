export class HttpGetListResponse {
  message: string;
  items: any; // Landlord, Tenant, Apartment, Offer, Room
  totalItems: number;
}

export class HttpGetItemResponse {
  message: string;
  item: any; // Landlord, Tenant, Apartment, Offer, Room
}

export class HttpCreateResponse {
  message: string;
  item: any; // Landlord, Tenant, Apartment, Offer, Room
}

export class HttpUpdateResponse {
  message: string;
  item: any; // Landlord, Tenant, Apartment, Offer, Room
}

export class HttpDeleteResponse {
  message: string;
  item: any; // Landlord, Tenant, Apartment, Offer, Room
}
