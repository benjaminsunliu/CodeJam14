export interface UserAuthModel {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  created: string;
  updated: string;
  token?: string;
}

export interface ISignUpPayload {
  username?: string;
  email: string;
  password: string;
  name?: string;
}
