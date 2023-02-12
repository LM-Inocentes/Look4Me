import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : '', title: 'LOOK4ME', component : LandingPageComponent},
  {path : 'home', title: 'LOOK4ME:Home', component : HeaderComponent},
  {path : 'login',title: 'LOOK4ME:Login',  component : LoginComponent},
  {path : 'register',title: 'LOOK4ME:Register',  component : RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
