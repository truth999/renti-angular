export class SignupRequest {
  name: string;
  email: string;
  password: string;
}

export class AuthRequest {
  email: string;
  password: string;
}

export class AuthResponse {
  token: string;
  expiredIn: number;
  userId: string;
}
