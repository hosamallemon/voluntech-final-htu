import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/company/login/login.component';
import { CompanyLayoutComponent } from './layout/company-layout/company-layout.component';
import { VolunteerLayoutComponent } from './layout/volunteer-layout/volunteer-layout.component';

const routes: Routes = [
  {path:'',component:AppComponent},
  {path:'company',component: CompanyLayoutComponent ,children:[
    {path:'',redirectTo:'/company/login',pathMatch:'full'},
    {path:'login',component:LoginComponent}
  ]},
  {path:'volunteer',component: VolunteerLayoutComponent ,children:[
    {path:'',redirectTo:'/volunteer/login' ,pathMatch:'full'},
    {path:'login',component:LoginComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
