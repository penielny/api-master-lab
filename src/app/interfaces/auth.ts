export interface User {
  email: string;
  fullName: string;
}

export interface Authentication {
  isAuthenticated: boolean,
  token: string;
  user: User;
}
