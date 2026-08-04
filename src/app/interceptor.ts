// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class InterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log(`Request sent on ${req.url}`);
//     return next.handle(req).pipe(
//       catchError(err=>throwError(err))
//     )
//   }


// }

import { HttpInterceptorFn } from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  // Transfer your interceptor logic from InterceptorService here
  console.log('Intercepting request to URL:', req.url);
  return next(req);
};
