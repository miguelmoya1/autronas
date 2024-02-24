export const GoogleAuth = {
  signIn: () =>
    Promise.resolve({
      email: 'email@email.com',
      id: 'id',
      givenName: 'givenName',
      familyName: 'familyName',
      imageUrl: 'imageUrl',
      name: 'name',
      serverAuthCode: 'serverAuthCode',
      authentication: {
        accessToken: 'accessToken',
        idToken: 'idToken',
      },
    }),
  signOut: () => Promise.resolve(),
  initialize: (_: any) => {
    return _;
  },
};

export interface User {
  email: string;
  id: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
  name: string;
  serverAuthCode: string;
  authentication: {
    accessToken: string;
    idToken: string;
  };
}
