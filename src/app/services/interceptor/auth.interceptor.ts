import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const TOKEN = localStorage.getItem('accessToken');
    if (TOKEN) {
      const skip = request.headers.get('skip');
      if (skip) {
        request = request.clone({
          headers: request.headers.delete('skip'),
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
