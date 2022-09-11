import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { CompanyService } from 'src/app/service/companyServ/company.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private companyService:CompanyService,
    public authService:AuthService,
    private router:Router) { }
  ngOnInit(): void {
    this.companyService.userState$?.subscribe((profile)=> {
      if(profile){
        this.profileInfo.setValue({
          companyName: profile.companyName+"",
          phone: profile.phone+"",
          url: profile.url+"",
          email: profile.email+"",
          companyType:profile.companyType+"",
        });
      }
    })

  }
  profileInfo = this.fb.group({
    companyName:this.fb.control('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    // companyType:this.fb.control(''),
    phone:this.fb.control('',[Validators.required,Validators.maxLength(15)]),
    url:this.fb.control(''),
    email:this.fb.control('',[Validators.required,Validators.email]),
    companyType:this.fb.control('',[Validators.required]),
    // experiences:this.fb.control(''),
    // skills:this.fb.control(''),
    // courses:this.fb.control(''),
    // availableTime:this.fb.control(''),
    // city:this.fb.control(''),
  })

  get email(){
    return this.profileInfo.controls.email;
  }
  get phone(){
    return this.profileInfo.controls.phone;
  }
  get companyName(){
    return this.profileInfo.controls.companyName;
  }
  get companyType(){
    return this.profileInfo.controls.companyType;
  }

  types: Type[] = [
    {value: 'NGO', viewValue: 'NGO'},
    {value: 'Government', viewValue: 'Government'},
    {value: 'Religious', viewValue: 'Religious'},
  ];
  saveForm(){
    console.log("ddd",this.profileInfo.value.companyType)
    this.authService.userState$.pipe(
      switchMap(user=> this.companyService.update({
        uid: user?.uid,
        companyType: this.profileInfo.value.companyType+'',
        companyName: this.profileInfo.value.companyName+'',
        email: user?.email+'',
        phone: this.profileInfo.value.phone+'',
        url: this.profileInfo.value.url+''
      }))
    ).subscribe(()=> {
        console.log('update was successfull');
        this.router.navigate(['/company']);
    });

  }
  back(){
    this.router.navigate(['/company']);
  }

}
interface Type {
  value: string;
  viewValue: string;
}

