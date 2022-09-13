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

  profile?:Volunteer;
  constructor(
    public volunService:VolunteerService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    public authService:AuthService,
    private uploadService:PicUploadService,) { }


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
        console.log()
      }
    })

  }

}

