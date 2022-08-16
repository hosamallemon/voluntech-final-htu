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
@NgModule({
  declarations: [
    AppComponent,
    CompanyLayoutComponent,
    VolunteerLayoutComponent,
    AuthLayoutComponent,
    RegisterComponent,
    CompanyProfileComponent,
    VolunteerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
