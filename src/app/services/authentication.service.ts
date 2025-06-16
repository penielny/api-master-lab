import { Injectable } from '@angular/core';
import { Authentication } from '../interfaces/auth';



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

  getToken(){
    return this.authentication?.token;
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
