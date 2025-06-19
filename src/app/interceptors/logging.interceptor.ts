import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('HTTP Request:', req);

    return next(req).pipe(
        tap({
            next: (event) => {
                if (event instanceof HttpResponse) {
                    console.log('HTTP Response:', event);
                }
            },
            error: (error) => {
                console.error('HTTP Error:', error);
            }
        })
    );
};
