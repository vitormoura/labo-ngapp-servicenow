import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SnAuthInterceptor } from "./sn-auth-interceptor";
import { SnTokenService } from "../sn-token.service";
import { SnBaseUrlInterceptor } from "./sn-baseurl-interceptor";
import { AppConfigService } from "../../app-config/app-config.service";

export const SnApiHttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: SnAuthInterceptor, deps: [SnTokenService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnBaseUrlInterceptor, deps: [AppConfigService], multi: true },
]