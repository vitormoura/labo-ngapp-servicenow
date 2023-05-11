import { Injectable } from '@angular/core';
import { AccessTokenInfo } from './sn-api.model';

const SN_TOKEN_INFO_STORAGE_KEY = 'sn_token_details';


@Injectable({
  providedIn: 'root'
})
export class SnTokenService {

  constructor() { }
  
  getAccessToken(): Promise<string | null> {
    const accessTokenInfoTemp = window.localStorage.getItem(SN_TOKEN_INFO_STORAGE_KEY);

    if (!accessTokenInfoTemp) {
      return Promise.resolve(null)
    }

    const accessTokenInfo = JSON.parse(accessTokenInfoTemp) as AccessTokenInfo;
    const now = new Date().getTime();
    const expiration = accessTokenInfo.expiration;

    if (expiration <= now) {
      // TODO: refresh token logic
      return Promise.resolve(null)
    };

    return Promise.resolve(accessTokenInfo.access_token)
  }

  setAccessToken(value: string, expiration: number, refreshToken?: string) {
    window.localStorage.setItem(SN_TOKEN_INFO_STORAGE_KEY, JSON.stringify({
      access_token: value,
      expiration: this.calcExpirationDate(expiration),
      refresh_token: refreshToken || ''
    } as AccessTokenInfo));
  }

  clearAccessToken() {
    window.localStorage.removeItem(SN_TOKEN_INFO_STORAGE_KEY);
  }

  private calcExpirationDate(seconds: number) {
    return new Date(new Date().getTime() + (seconds * 1000)).getTime();
  }
}
