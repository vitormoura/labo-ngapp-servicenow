import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { AuthProcessStates } from './sn-api.model';
import { SnTokenService } from './sn-token.service';
import { IServiceNowConfigSection } from '../app-config/app-config.model';

const SN_AUTH_STATE_STORAGE_KEY = 'sn_oauth_state';
const SN_LOGIN_STATE = 'sn_login_state';


@Injectable({
  providedIn: 'root'
})
export class SnAuthService {

  private _settings: IServiceNowConfigSection;
  private _currentAuthState: AuthProcessStates = 'None'
  private _authStateSubject = new BehaviorSubject<AuthProcessStates>(this._currentAuthState);
  private _loginWindowRef: Window | null = null;
  private _redirectUrl = ''

  get state() {
    return this._authStateSubject.asObservable()
  }

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(AppConfigService) config: AppConfigService, private tokens: SnTokenService) {
    const appSettings = config.get();

    if (!appSettings || !appSettings.serviceNow) {
      throw new Error('invalid configuration: No ServiceNow config section')
    }

    this._settings = appSettings.serviceNow;
    this._redirectUrl = `${this.document.location.origin}/login`;

    this.listenToAuthStateChanges();
  }

  checkUserAuthentication() {
    return this.tokens.getAccessToken().then(Boolean)
  }

  beginUserLogin(force: boolean = false) {

    this.updateAuthState('InProgress')

    const execUserLoginLogic = () => {
      const state = this.initNewLoginStateValue();
      const url = this.prepareNewLoginUrl(state);

      return this.openServiceNowLoginForm(url);
    }


    if (force) {
      execUserLoginLogic()
      return Promise.resolve();
    }

    return this.checkUserAuthentication().then(authenticated => {

      if (authenticated) {
        this.updateAuthState('Success')
        return
      }

      return execUserLoginLogic()
    })
  }

  logoutUser() {
    this.clearLoginStateValue();
    this.updateAuthState('None');
    this.tokens.clearAccessToken();
  }

  prepareNewLoginUrl(oauthStateValue?: string) {
    if (!oauthStateValue) {
      oauthStateValue = this.initNewLoginStateValue()
    }

    return `${this._settings.instanceUrl}/oauth_auth.do?client_id=${this._settings.clientId}&response_type=token&scope=useraccount&state=${encodeURI(oauthStateValue)}&redirect_uri=${encodeURI(this._redirectUrl)}`
  }

  handleUserLoginResult(accessToken: string, state: string, expiresIn?: string): boolean {
    if (!accessToken || !state || !state) {
      return false
    }

    const currentLoginStateValue = this.getCurrentLoginStateValue();

    if (!currentLoginStateValue || currentLoginStateValue !== state) {
      console.warn(`invalid oauth state: ${state} != ${currentLoginStateValue}`)
      this.updateAuthState('Failed');
      return false
    }

    this.tokens.setAccessToken(accessToken, parseInt(expiresIn || '0'))
    this.clearLoginStateValue();

    this.updateAuthState('Success');

    return true
  }

  private listenToAuthStateChanges() {
    window.addEventListener("storage", (e: StorageEvent) => {

      if (e.key === SN_LOGIN_STATE && this._currentAuthState !== e.newValue) {
        this.updateAuthState(<AuthProcessStates>e.newValue);

        if (e.newValue === 'Success' && this._loginWindowRef) {
          this._loginWindowRef.close();
        }
      }
    });
  }

  private openServiceNowLoginForm(url: string) {
    const popupFeatures = 'width=600,height=600,popup=true,noreferrer=true,noopener=false,toolbar=false';
    const popupName = 'login_form'

    this._loginWindowRef = this.document.open(url, popupName, popupFeatures)
  }

  private initNewLoginStateValue() {
    const oauthReqState = this.generateRandomStateValue();

    window.localStorage.setItem(SN_AUTH_STATE_STORAGE_KEY, oauthReqState);

    return oauthReqState;
  }

  private getCurrentLoginStateValue() {
    return window.localStorage.getItem(SN_AUTH_STATE_STORAGE_KEY);
  }


  private updateAuthState(state: AuthProcessStates) {
    window.localStorage.setItem(SN_LOGIN_STATE, state);
    this._currentAuthState = state;
    this._authStateSubject.next(state);
  }

  private clearLoginStateValue() {
    window.sessionStorage.removeItem(SN_AUTH_STATE_STORAGE_KEY);
  }

  private generateRandomStateValue() {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz'
    let length = 32;
    let result = ''

    while (length > 0) {
      var bytes = new Uint8Array(16);
      var random = window.crypto.getRandomValues(bytes);

      random.forEach(function (c) {
        if (length === 0) {
          return;
        }
        if (c < charset.length) {
          result += charset[c];
          length--;
        }
      });
    }

    return result;
  }


}
