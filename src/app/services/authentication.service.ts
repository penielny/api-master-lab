import { Injectable } from '@angular/core';

interface User {
  email: string;
  fullName: string;
}

interface Authentication {
  isAuthenticated: boolean,
  token: string;
  user: User;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private prefix: string = "api-master::";
  private authentication: Authentication | undefined = undefined;

  constructor() { }

isAuthenticated(): boolean {
  return !!(this.authentication?.isAuthenticated);
}

  logout() {
    this.authentication = undefined;
  }


  getLocalStoreState() {
    const localStoreString = localStorage.getItem(`${this.prefix}auth`);
    if (!localStoreString) return;
    this.authentication = JSON.parse(localStoreString)
  }


}
