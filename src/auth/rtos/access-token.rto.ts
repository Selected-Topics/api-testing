export class AccessTokenRto {
  constructor(public accessToken: string) {}

  static fromAccessToken(accessToken: string): AccessTokenRto {
    return new AccessTokenRto(accessToken);
  }
}
