export class SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: string;
    language: string;
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
