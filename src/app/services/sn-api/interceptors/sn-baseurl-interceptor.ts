import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfigService } from "../../app-config/app-config.service";

@Injectable()
export class SnBaseUrlInterceptor implements HttpInterceptor {
    constructor(private appConfig: AppConfigService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const originalUrl = req.url
        const settings = this.appConfig.get();
        const updatedReq = req.clone(
            { url: `${settings.serviceNow.instanceUrl}${settings.serviceNow.apiNamespace}${originalUrl}` }
        );

        return next.handle(updatedReq)
    }
}