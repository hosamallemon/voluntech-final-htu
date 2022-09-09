import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { Activity, ActivityService } from './../../../service/companyServ/activity.service';
import { VolunteerService } from './../../../service/volunteerServ/volunteer.service';

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
    private volunteerSrv:VolunteerService) {

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
    this.authService.userState$.subscribe((userCredential)=> {
      this.activityServ.currentUserActvities$?.subscribe((data)=> {
        if(data){
          this.activityServ.addApplicant(id+'',userCredential?.uid+'')
        }
      })
    })
  }
}
