export type AccountTypes = 'landlord' | 'tenant';

export class User {
  email: string;
  password: string;
  type: AccountTypes;
}

export class Language {
  code: string;
  name: string;
  flag: string;
}
