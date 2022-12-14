import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isLoggedIn = localStorage.getItem('auth') || null;
        if(!!isLoggedIn) isLoggedIn = JSON.parse(isLoggedIn)?.tokens || null;
        const isApiUrl = request.url.startsWith(environment.url);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + isLoggedIn
                }
            });
        }
        return next.handle(request);

    }
}