import { Component, OnInit } from '@angular/core';
import { SnAuthService } from '../../services/sn-api/sn-auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthProcessStates } from '../../services/sn-api/sn-api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginProgress$ = new BehaviorSubject<AuthProcessStates>('None')

  constructor(private authService: SnAuthService, private router: Router, private route: ActivatedRoute) {
    this.authService.state.subscribe(state => {
      this.loginProgress$.next(state)

      switch (state) {
        case 'Success':

          // Mode Pop-up
          if (window.opener) {
            return window.close()
          }

          // Mode direct link
          router.navigateByUrl('/', { replaceUrl: true })

          break
      }
    })
  }

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;

    if (fragment) {

      // Handle login redirect with AccessToken
      const urlParams = new URLSearchParams(fragment);

      const accessToken = urlParams.get('access_token');
      const state = urlParams.get('state');
      const expiresIn = urlParams.get('expires_in');

      if (!accessToken || !state || !expiresIn) {
        return
      }

      this.authService.handleUserLoginResult(accessToken, state, expiresIn)
    }
  }
}
