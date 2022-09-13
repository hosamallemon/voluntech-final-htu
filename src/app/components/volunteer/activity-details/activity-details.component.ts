import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { Activity, ActivityService } from './../../../service/companyServ/activity.service';
import { VolunteerService } from './../../../service/volunteerServ/volunteer.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  activity?:Activity;

  constructor(private router:Router ,
    private route:ActivatedRoute,
    public activityServ:ActivityService,
    private authService:AuthService,
    private volunteerSrv:VolunteerService,
    private toast: HotToastService,) {

  }

  Back(){
    this.router.navigate(['volunteer/activities'])
  }
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') as string;
    console.log(id)
    this.activityServ.get(id).subscribe((data)=>{
      console.log('one data',data)
      if(data){
        this.activity=data;
      }
    });


    // this.profileService.userState$?.subscribe((profile)=> {
    //   if(profile){
    //     this.profileDetailsForm.setValue({
    //       fullName: profile.fullName+"",
    //       age: profile.age ?? 0,
    //       email:profile.email+'',
    //     });
    //   }
    //  })
  }

  apply(){

    const id = this.route.snapshot.paramMap.get('id') as string;
    this.authService.userState$?.pipe(take(1)).subscribe((authData)=> {
      this.volunteerSrv.userState$?.pipe(take(1)).pipe(
        this.toast.observe({
        loading: 'Applying in ...',
        success: 'Applying Successfully',
        error:(error)=> 'This error Happened: '+error
      })).subscribe((data)=> {
        if(data){
          this.activityServ.addApplicant({
            activityId:             id,
            applicantUserId:        data.uid+'',
            applicantFirstName:     data.firstName+'',
            applicantLastName:      data.lastName+'',
            applicantSkills:        data.skills,
            applicantCity:          data.city+'',
            photoUrl:               authData?.photoURL??'',
          })
        }
      })
    })

    // this.volunteerSrv.userState$?.subscribe((userCredential)=> {
    //   this.activityServ.currentUserActvities$?.subscribe((data)=> {
    //     if(data){
    //       this.activityServ.addApplicant(id+'',userCredential?.uid+'')
    //     }
    //   })
    // })
  }
}
