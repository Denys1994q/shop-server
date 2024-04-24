export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface isVerifiedToken {
  sub: string;
  iat: number;
  exp: number;
}
