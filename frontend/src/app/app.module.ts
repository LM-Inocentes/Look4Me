import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InputContainerComponent } from './components/input/input-container/input-container.component';
import { InputLoadingComponent } from './components/input/input-loading/input-loading.component';
import { TextInputComponent } from './components/input/text-input/text-input.component';
import { InputValidationComponent } from './components/input/input-validation/input-validation.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FoundInfoPageComponent } from './components/found-info-page/found-info-page.component';
import { LostInfoPageComponent } from './components/lost-info-page/lost-info-page.component';
import { PostItemPageComponent } from './components/post-item-page/post-item-page.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    InputContainerComponent,
    InputLoadingComponent,
    TextInputComponent,
    InputValidationComponent,
    HeaderComponent,
    ProfilePageComponent,
    FoundInfoPageComponent,
    LostInfoPageComponent,
    PostItemPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
