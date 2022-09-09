import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { PicUploadService } from 'src/app/service/picture-upload/pic-upload.service';
import { Volunteer, VolunteerService } from 'src/app/service/volunteerServ/volunteer.service';
import { switchMap } from 'rxjs';

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
  profile?:Volunteer;
  constructor(
    private volunService:VolunteerService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    public authService:AuthService,
    private uploadService:PicUploadService,) { }

  // profileInfo = this.fb.group({
  //   firstName:this.fb.control('',[Validators.required,Validators.maxLength(8)]),
  //   lastName:this.fb.control('',[Validators.required,Validators.maxLength(8)]),
  //   phone:this.fb.control('',[Validators.required,Validators.maxLength(9)]),
  //   experiences:this.fb.control(''),
  //   skills:this.fb.control(''),
  //   courses:this.fb.control(''),
  //   city:this.fb.control(''),
  //   email:this.fb.control(''),
  //   range: this.fb.group({
  //     start: new FormControl<Date | null>(null),
  //     end: new FormControl<Date | null>(null),
  //   }),

  // })

  // get email(){
  //   return this.profileInfo.controls.email;
  // }
  // get password(){
  //   return this.profileInfo.controls.password;
  // }

  // submit(){
  //   this.authService.userState$.pipe(
  //     switchMap(user=> this.volunService.update({
  //       uid: user?.uid,
  //       firstName: this.profileInfo.value.firstName+'',
  //       lastName: this.profileInfo.value.lastName+'',
  //       email: user?.email+'',
  //       phone: this.profileInfo.value.phone+'',
  //       experiences: this.profileInfo.value.experiences+'',
  //       skills: this.profileInfo.value.skills+'',
  //       courses: this.profileInfo.value.courses+'',
  //       range:{...this.profileInfo.value.range},
  //       city: this.profileInfo.value.city+'',
  //     }))
  //   ).subscribe(()=> {
  //       console.log('update was successfull');
  //       // this.router.navigate(['/company']);
  //   });
  // }
  changePic(event : Event){
    const input = <HTMLInputElement> event.target;
    const obj = input?.files?.[0] as File;
    this.uploadService.uploadImage(obj,"volunteerPic").subscribe();
}
  all(){
    this.router.navigate(['/volunteer/activities']);
  }
  edit(){
    this.router.navigate(['/volunteer/profile/edit']);
  }
  ngOnInit(): void {

    this.volunService.userState$?.subscribe((data)=> {
      if(data){
        this.profile = data;
        // this.profile=data;
        // this.profileInfo.controls['firstName'].setValue(data.firstName+'');
        // this.profileInfo.controls['lastName'].setValue(data.lastName+'');
        // this.profileInfo.controls['phone'].setValue(data.phone+'');
        // this.profileInfo.controls['city'].setValue(data.city+'');
        // this.profileInfo.controls['email'].setValue(data.email+'');
        // this.profileInfo.controls['phone'].setValue(data.phone+'');

        // this.profileInfo.setValue({
        //   firstName:data.firstName+'',
        //   lastName:data.lastName+'',
        //   phone:data.phone+'',
        //   experiences:data.experiences+'',
        //   skills:data.skills+'',
        //   courses:data.courses+'',
        //   range:{start:'19/02/2222'.toDate(),end:'dsad'},
        //   city:data.city+'',
        //   email:data.email+'',
        // });
      }
    })

  }

}

