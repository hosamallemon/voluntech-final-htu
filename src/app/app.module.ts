import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyLayoutComponent } from './layout/company-layout/company-layout.component';
import { VolunteerLayoutComponent } from './layout/volunteer-layout/volunteer-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { VolunteerProfileComponent } from './components/volunteer/volunteer-profile/volunteer-profile.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LandingComponent } from './components/landing/landing.component';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    CompanyLayoutComponent,
    VolunteerLayoutComponent,
    AuthLayoutComponent,
    RegisterComponent,
    CompanyProfileComponent,
    VolunteerProfileComponent,
    LandingComponent,
    LandingLayoutComponent,
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
