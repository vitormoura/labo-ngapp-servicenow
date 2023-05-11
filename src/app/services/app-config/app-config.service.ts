import { Injectable } from '@angular/core';
import { IAppConfig } from './app-config.model';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppConfigService {

  static settings: IAppConfig;

  constructor(private handler: HttpBackend) { }

  get() {
    return Object.assign({}, AppConfigService.settings)
  }

  load() {
    if (AppConfigService.settings) {
      return Promise.resolve(AppConfigService.settings);
    }

    const httpClient = new HttpClient(this.handler);
    const jsonFile = `assets/config/config.${environment.name}.json`;

    return new Promise<void>((resolve, reject) => {
      firstValueFrom(httpClient.get(jsonFile)).then((resp) => {
        AppConfigService.settings = <IAppConfig>resp;
        resolve();
      }).catch(err => {
        reject(`Could not load config file '${jsonFile}': '${JSON.stringify(err)}' `)
      })
    })
  }
}

