import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('isLoggedIn')
        // add auth header with jwt if user is logged in and request is to the api url
        let isLoggedIn = localStorage.getItem('auth') || null;
        // console.log('isLoggedIn', isLoggedIn)
        if(!!isLoggedIn) isLoggedIn = JSON.parse(isLoggedIn)?.tokens || null;
        // console.log('environment.url' , environment.url);
        const isApiUrl = request.url.startsWith(environment.url);
        // console.log('isApiUrl', isApiUrl)
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + isLoggedIn
                }
            });
        }
        // console.log('request' , request)
        return next.handle(request);

    }
}