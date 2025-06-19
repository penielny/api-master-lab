import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { tap } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const pagination = inject(PaginationService)

  return next(req).pipe(tap((event) => {
    if (event instanceof HttpResponse) {
      const totalCount = event.headers.get('X-Total-Count');
      if (!totalCount) return
      pagination.setTotalPage(parseInt(totalCount))
    }
  }))

};
