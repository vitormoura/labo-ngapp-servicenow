import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, lastValueFrom } from "rxjs";
import { SnTokenService } from "../sn-token.service";

@Injectable()
export class SnAuthInterceptor implements HttpInterceptor {
    constructor(private snTokens: SnTokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(req, next))
    }

    private async handle(req: HttpRequest<any>, next: HttpHandler) {

        const accessToken = await this.snTokens.getAccessToken()

        if (!accessToken) {
            return lastValueFrom(next.handle(req))
        }

        const authReq = req.clone({
            setHeaders: { 'Authorization': `Bearer ${accessToken}` }
        });

        return lastValueFrom(next.handle(authReq))
    }
}