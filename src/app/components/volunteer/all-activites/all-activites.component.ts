import { Component, OnInit } from '@angular/core';
import { Activity, ActivityService } from './../../../service/companyServ/activity.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../service/authServ/auth.service';

@Component({
  selector: 'app-all-activites',
  templateUrl: './all-activites.component.html',
  styleUrls: ['./all-activites.component.scss']
})
export class AllActivitesComponent implements OnInit {

  activities ?:Activity[];
  constructor(public activityserv:ActivityService,
    private router:Router,
    public activityServ:ActivityService,
    private authService:AuthService,) {

    this.activityserv.getAll().subscribe((data)=>{
      console.log('all data',data)
      this.activities=data;
    })
  }

  // public detail(id:string){
  //   this.router.navigate([`volunteer/activities/${id}`])
  // }
  ngOnInit(): void {
  }

}
