import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        const customerId = this.authService.getCustomerId();
        const companyId = this.authService.getCompanyId();
        // Do not add Authorization header for login an
        if (!req.url.includes('login') && authToken && customerId && !companyId) {
            const authRequest = req.clone({
                headers: req.headers.set('authorization', authToken)
                    .set('customer-id', customerId + '')
            });
            return next.handle(authRequest);
        } else if (!req.url.includes('login') && authToken && customerId && companyId) {
            const authRequest = req.clone({
                headers: req.headers.set('authorization', authToken)
                    .set('customer-id', customerId + '')
                    .set('company-id', companyId + '')
            });
            return next.handle(authRequest);
        }
        return next.handle(req);
    }
}
