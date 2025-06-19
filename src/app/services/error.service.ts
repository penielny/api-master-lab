import { inject, Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  alertService = inject(AlertService)
  constructor() { }


  handleError(error: HttpErrorResponse): void {
    let title = "Unexpected Error"
    let userMessage = 'An unexpected error occurred.';

    if (error.error instanceof ErrorEvent) {
      title = "Network Error"
      userMessage = `Check your internet connectivity and and try again`;
    } else {
      title = "Server Error"
      switch (error.status) {
        case 400:
          userMessage = 'Bad Request. Please check your input.';
          break;
        case 401:
          userMessage = 'Unauthorized. Please log in.';
          break;
        case 403:
          userMessage = 'Forbidden. You don’t have permission.';
          break;
        case 404:
          userMessage = 'Resource not found.';
          break;
        case 500:
          userMessage = 'Server error. Please try again later.';
          break;
        default:
          userMessage = `Check your internet connectivity and and try again`;
      }
    }
    this.alertService.error(title, userMessage)
  }

}
