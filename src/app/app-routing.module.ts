import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/workspace/index/index.component';
import { snUserAuthenticated } from './services/sn-api/sn-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'workspace',
    canActivate: [snUserAuthenticated],
    children: [
      {
        path: 'index',
        component: IndexComponent
      }
    ]
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
