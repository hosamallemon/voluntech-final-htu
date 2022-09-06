import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { Activity, ActivityService } from 'src/app/service/companyServ/activity.service';

@Component({
  selector: 'app-company-activities-list',
  templateUrl: './company-activities-list.component.html',
  styleUrls: ['./company-activities-list.component.scss']
})
export class CompanyActivitiesListComponent implements OnInit {

  constructor(public activitiesService: ActivityService, public authService: AuthService) { }
  activities?: Activity[]
  // companies: Company[]
  ngOnInit(): void {

    this.authService.userState$.subscribe((userCredential)=> {
      this.activitiesService.currentUserActvities$?.subscribe((data)=> {
        console.log(data, 'before filter');
        this.activities = data?.filter((value)=> {
          return value.companyId == userCredential?.uid;
        });
        console.log(this.activities,'after filter');
      })
    })
  }


}
