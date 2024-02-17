export interface GoogleLogin {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
  accessToken: string;
  idToken: string;
}

export interface LoginResponse {
  token: string;
}
