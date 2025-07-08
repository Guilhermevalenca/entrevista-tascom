export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  picture?: string | File;
}
