export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}
