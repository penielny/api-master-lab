import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotifcationComponent } from '../notifcation/notifcation.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NotifcationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
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
    this.authenticationService.login()
  }
  doLogout() {
    this.authenticationService.logout();

    const currentUrl = this.router.url;

    const isEdit = /^\/post\/\d+\/edit$/.test(currentUrl);
    const isNew = currentUrl === '/posts/new';

    if (isEdit || isNew) {
      this.router.navigate(['/']);
    }
  }

}
