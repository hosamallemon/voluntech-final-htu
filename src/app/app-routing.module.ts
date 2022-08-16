import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { VolunteerProfileComponent } from './components/volunteer/volunteer-profile/volunteer-profile.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CompanyLayoutComponent } from './layout/company-layout/company-layout.component';
import { VolunteerLayoutComponent } from './layout/volunteer-layout/volunteer-layout.component';

const routes: Routes = [
  {path:'',component:AppComponent},
  {path:'',component: VolunteerLayoutComponent ,children:[
    {path:'',redirectTo:'/volunteer' ,pathMatch:'full'},
    {path:'volunteer',component:VolunteerProfileComponent}
  ]},
  {path:'',component: CompanyLayoutComponent ,children:[
    {path:'',redirectTo:'/company',pathMatch:'full'},
    {path:'company',component:CompanyProfileComponent},
  ]},

  {path:'',component: AuthLayoutComponent ,children:[
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent}
  ]},
  {path:'',component: AuthLayoutComponent ,children:[
    {path:'',redirectTo:'/register',pathMatch:'full'},
    {path:'register',component:RegisterComponent}
  ]},

  {path:'company',component: CompanyLayoutComponent ,children:[
    {path:'',redirectTo:'/company/profile',pathMatch:'full'},
    {path:'profile',component:CompanyProfileComponent},
  ]},

  {path:'volunteer',component: VolunteerLayoutComponent ,children:[
    {path:'',redirectTo:'/volunteer/profile' ,pathMatch:'full'},
    {path:'profile',component:VolunteerProfileComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
