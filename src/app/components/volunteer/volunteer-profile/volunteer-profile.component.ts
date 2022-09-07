import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Volunteer, VolunteerService } from 'src/app/service/volunteerServ/volunteer.service';

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.scss']
})
export class VolunteerProfileComponent implements OnInit {

  // firstName?:string;
  // lastName?:string;
  // email?:string;
  // password?:number;
  // phone?:string;
  // pic?:string;
  // skills?:string;
  // experiences?:any;
  // courses?:any;
  // availableTime?:string;
  // id?: string;
  constructor(private volunService:VolunteerService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute) { }

  profileInfo = this.fb.group({
    firstName:this.fb.control('',[Validators.required,Validators.maxLength(8)]),
    lastName:this.fb.control('',[Validators.required,Validators.maxLength(8)]),
    phone:this.fb.control('',[Validators.required,Validators.maxLength(9)]),
    experiences:this.fb.control(''),
    skills:this.fb.control(''),
    courses:this.fb.control(''),
    availableTime:this.fb.control(''),
    city:this.fb.control(''),
    email:this.fb.control(''),

  })

  get email(){
    return this.profileInfo.controls.email;
  }
  // get password(){
  //   return this.profileInfo.controls.password;
  // }

  submit(){
    // debugger
  }
  all(){
    this.router.navigate(['/volunteer/activities']);
  }
  ngOnInit(): void {

    this.volunService.userState$?.subscribe((profile)=> {
      if(profile){
        this.profileInfo.setValue({
          firstName:profile.firstName+'',
          lastName:profile.lastName+'',
          phone:profile.phone+'',
          experiences:profile.experiences+'',
          skills:profile.skills+'',
          courses:profile.courses+'',
          availableTime:profile.availableTime+'',
          city:profile.city+'',
          email:profile.email+'',
        });
      }
    })
    // const routeid = this.route.snapshot.paramMap.get('id');
    // if(routeid){
    //   this.id = routeid;
    //   this.volunService.get(this.id).pipe(
    //     take(1),
    //     map(value=> value as Volunteer)
    //   ).subscribe((data)=>{
    //     console.log(data)
    //     this.profileInfo.setValue({
    //       firstName:data.firstName+'',
    //       lastName:data.lastName+'',
    //       phone:data.phone+'',
    //       experiences:data.experiences+'',
    //       availableTime:data.availableTime+'',
    //       city:data.city+'',
    //       courses:data.courses+'',
    //       skills:data.skills+'',
    //     })
    //   })
    // }
  }

}

