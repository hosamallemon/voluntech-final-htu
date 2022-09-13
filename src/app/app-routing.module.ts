import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotAuthorizedComponent } from './components/auth/not-authorized/not-authorized.component';
import { CompanyRegistrationComponent } from './components/auth/register/company-registration/company-registration.component';
import { VolunteerRegistrationComponent } from './components/auth/register/volunteer-registration/volunteer-registration.component';
import { RegisterTypeComponent } from './components/auth/register/register-type/register-type.component';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { EditProfileComponent } from './components/company/edit-profile/edit-profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { VolunteerProfileComponent } from './components/volunteer/volunteer-profile/volunteer-profile.component';
import { AuthGuard } from './guards/authGuard/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CompanyLayoutComponent } from './layout/company-layout/company-layout.component';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { RegisterTypeLayoutComponent } from './layout/register-type-layout/register-type-layout.component';
import { VolunteerLayoutComponent } from './layout/volunteer-layout/volunteer-layout.component';
import { CompanyGuard } from './guards/companyGuard/company.guard';
import { VolunteerGuard } from './guards/volunteerGuard/volunteer.guard';
import { CreateActivityComponent } from './components/company/create-activity/create-activity.component';
import { CompanyActivitiesListComponent } from './components/company/company-activities-list/company-activities-list.component';
import { AllActivitesComponent } from './components/volunteer/all-activites/all-activites.component';
import { ActivityDetailsComponent } from './components/volunteer/activity-details/activity-details.component';
import { ApplicantsListComponent } from './components/company/applicants-list/applicants-list.component';
import { VolunteerEditProfileComponent } from './components/volunteer/volunteer-edit-profile/volunteer-edit-profile.component';
import { ContactComponent } from './components/about/contact/contact.component';

const routes: Routes = [
  // {path:'',redirectTo:'/landing',pathMatch:'full'},
  {path:'',component:LandingComponent, pathMatch:"full"},
  {path:'login',component:LoginComponent},
  // {path:'register',component:RegisterComponent},
  {path:'not-authorized',component:NotAuthorizedComponent},
  {path:'contact',component:ContactComponent},

    {path:'register',component: RegisterTypeLayoutComponent ,children:[
      {path:'',redirectTo:'/register/volunteer',pathMatch:'full'},
      // {path:'type',component:RegisterTypeComponent},
      {path:'volunteer',component:VolunteerRegistrationComponent},
      {path:'company',component:CompanyRegistrationComponent},
  ]},

  {path:'company',component: CompanyLayoutComponent , canActivate:[AuthGuard,CompanyGuard],children:[
    {path:'',redirectTo:'/company/profile',pathMatch:'full'},
    {path:'profile',component:CompanyProfileComponent},
    {path:'profile/edit',component:EditProfileComponent},
    {path: 'create-activity', component: CreateActivityComponent},
    {path: 'activities', component: CompanyActivitiesListComponent},
    {path: 'activities/:id', component: ApplicantsListComponent},
  ]},

  {path:'volunteer',component: VolunteerLayoutComponent , canActivate:[AuthGuard,VolunteerGuard], children:[
    {path:'',redirectTo:'/volunteer/profile' ,pathMatch:'full'},
    {path:'profile',component:VolunteerProfileComponent},
    {path:'profile/edit',component:VolunteerEditProfileComponent},
    {path:'activities',component:AllActivitesComponent},
    {path:'activities/:id',component:ActivityDetailsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
