import { Component, OnInit } from '@angular/core';
import { SnAuthService } from '../../services/sn-api/sn-auth.service';
import { SnUserInfoService } from '../../services/sn-api/sn-user-info.service';
import { Observable } from 'rxjs';
import { IUser } from '../../services/sn-api/sn-api.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<IUser | null>;

  constructor(private authService: SnAuthService, private userInfo: SnUserInfoService,) {
    this.user$ = this.userInfo.user;
  }

  ngOnInit(): void {
    this.authService.checkUserAuthentication().then(authenticated => {
      if (!authenticated) {
        this.login()
      }
    })
  }

  login() {
    const loginUrl = this.authService.prepareNewLoginUrl()
    window.location.href = loginUrl;
  }
}
