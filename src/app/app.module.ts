import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Component} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyLayoutComponent } from './layout/company-layout/company-layout.component';
import { VolunteerLayoutComponent } from './layout/volunteer-layout/volunteer-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
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
import { EditProfileComponent } from './components/company/edit-profile/edit-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotAuthorizedComponent } from './components/auth/not-authorized/not-authorized.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterTypeComponent } from './components/auth/register/register-type/register-type.component';
import { CompanyRegistrationComponent } from './components/auth/register/company-registration/company-registration.component';
import { VolunteerRegistrationComponent } from './components/auth/register/volunteer-registration/volunteer-registration.component';
import { RegisterTypeLayoutComponent } from './layout/register-type-layout/register-type-layout.component';
import {MatTabsModule} from '@angular/material/tabs';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CreateActivityComponent } from './components/company/create-activity/create-activity.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CompanyActivitiesListComponent } from './components/company/company-activities-list/company-activities-list.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AllActivitesComponent } from './components/volunteer/all-activites/all-activites.component';
import {MatCardModule} from '@angular/material/card';
import { ActivityDetailsComponent } from './components/volunteer/activity-details/activity-details.component';
import {MatTableModule} from '@angular/material/table';
import { ApplicantsListComponent } from './components/company/applicants-list/applicants-list.component';
import { VolunteerEditProfileComponent } from './components/volunteer/volunteer-edit-profile/volunteer-edit-profile.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
    CompanyLayoutComponent,
    VolunteerLayoutComponent,
    AuthLayoutComponent,
    CompanyProfileComponent,
    VolunteerProfileComponent,
    LandingComponent,
    LandingLayoutComponent,
    EditProfileComponent,
    LoginComponent,
    NotAuthorizedComponent,
    CompanyRegistrationComponent,
    VolunteerRegistrationComponent,
    RegisterTypeComponent,
    VolunteerRegistrationComponent,
    RegisterTypeLayoutComponent,
    CreateActivityComponent,
    CompanyActivitiesListComponent,
    AllActivitesComponent,
    ActivityDetailsComponent,
    ApplicantsListComponent,
    EditProfileComponent,
    VolunteerEditProfileComponent



  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    HotToastModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
