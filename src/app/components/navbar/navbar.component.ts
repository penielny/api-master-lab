import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink } from '@angular/router';
import { NotifcationComponent } from '../notifcation/notifcation.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NotifcationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.isAuthenticated = this.authenticationService.isAuthenticated()
  }

  ngOnInit(): void {
    this.authenticationService.authentication$.subscribe({
      next: (value) => {
        if (value) {
          this.isAuthenticated = value.isAuthenticated;
          return;
        }
        this.isAuthenticated = false;
      },
    })
  }

  ngOnDestroy(): void {
   
  }

  doLogin() {
    console.log(this.isAuthenticated)
    this.authenticationService.login()
  }

  doLogout() {
    this.authenticationService.logout()
  }

}
