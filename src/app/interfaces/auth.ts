export interface User {
  id:number,
  email: string;
  fullName: string;
}

export interface Authentication {
  isAuthenticated: boolean,
  token: string;
  user: User;
}
