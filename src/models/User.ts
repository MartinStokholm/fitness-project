export type Login = {
  email: string;
  password: string;
};

export type NewPassword = {
  email: string;
  password: string;
  oldPassword: string;
};

export type Token = {
  jwt: string;
};

type User = {
  userId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  personalTrainerId?: number;
  accountType?: string;
};
export default User;
