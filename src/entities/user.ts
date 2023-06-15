export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  fullName: string;
};

export type UserLogin = {
  userID: string; // Email o userName
  password: string;
};
