import { Injectable } from '@angular/core';
import { Authentication } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private prefix: string = "api-master::";

  private authenticationSubject = new BehaviorSubject<Authentication | undefined>(undefined);
  public authentication$: Observable<Authentication | undefined> = this.authenticationSubject.asObservable();

  constructor() {
    this.getLocalStoreState()
  }

  isAuthenticated(): boolean {
    const currentAuthValue = this.authenticationSubject.getValue()
    return !!(currentAuthValue?.isAuthenticated);
  }



  userInfo() {
    return this.authenticationSubject.getValue()
  }


  getToken(): string | undefined {
    const currentAuthValue = this.authenticationSubject.getValue()
    return currentAuthValue?.token;
  }

  logout(): void {
    this.authenticationSubject.next(undefined);
  }


  login(): void {
    
    const authResponse = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
      isAuthenticated: true,
      user: {
        id: 1,
        email: "example@domain.com",
        fullName: "Sweet Stuffs"
      }
    }
    this.authenticationSubject.next(authResponse)
    localStorage.setItem(`${this.prefix}auth`, JSON.stringify(authResponse))

  }


  getLocalStoreState(): void {
    
    const localStoreString = localStorage.getItem(`${this.prefix}auth`);
    if (!localStoreString) return;
    this.authenticationSubject.next(JSON.parse(localStoreString))
    
  }


}
