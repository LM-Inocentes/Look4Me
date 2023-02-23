import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostFoundPageComponent } from './components/post-found-page/post-found-page.component';
import { PostLostPageComponent } from './components/post-lost-page/post-lost-page.component';
import { FoundItemsPageComponent } from './components/found-items-page/found-items-page.component';
import { LostItemsPageComponent } from './components/lost-items-page/lost-items-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path : '', title: 'LOOK4ME', component : LandingPageComponent},
  {path : 'login',title: 'LOOK4ME:Login',  component : LoginComponent},
  {path : 'register',title: 'LOOK4ME:Register',  component : RegisterComponent},
  {path : 'post-found',title: 'LOOK4ME:Post',  component : PostFoundPageComponent},
  {path : 'post-lost',title: 'LOOK4ME:Post',  component : PostLostPageComponent},
  {path : 'found-items',title: 'LOOK4ME:Found',  component : FoundItemsPageComponent},
  {path : 'lost-items',title: 'LOOK4ME:Lost',  component : LostItemsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
