import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AppConfigService } from './services/app-config/app-config.service';
import { SnApiHttpInterceptorProviders } from './services/sn-api/interceptors/sn-interceptors';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/workspace/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    SnApiHttpInterceptorProviders,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfigService) => {
        return () => appConfig.load()
      },
      deps: [AppConfigService], multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
