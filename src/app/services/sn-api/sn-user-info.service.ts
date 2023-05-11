import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnAuthService } from './sn-auth.service';
import { ISnApiResponse, IUser } from './sn-api.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnUserInfoService {

  private _userInfo = new BehaviorSubject<IUser | null>(null);

  get user() {
    return this._userInfo.asObservable();
  }

  constructor(private http: HttpClient, private authService: SnAuthService) {

    authService.state.subscribe(authResult => {

      switch (authResult) {
        case 'Success':
          this.reloadUserInfo()
          break

        case 'Failed':
          this._userInfo.next(null)
          break

        default:
          return
      }
    })

    authService.checkUserAuthentication().then(authenticated => authenticated ? this.reloadUserInfo() : null)
  }

  private reloadUserInfo() {
    this.http.get<ISnApiResponse<IUser>>('/donnees/utilisateurs/moi').subscribe({
      next: resp => {
        this._userInfo.next(resp.result.items[0]);
      },
      error: (err) => {
        this._userInfo.next(null)
      }
    })
  }
}
