import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Activity, ActivityService } from './../../../service/companyServ/activity.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  activity?:Activity;

  constructor(private router:Router ,private route:ActivatedRoute,public activityServ:ActivityService) {

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
  }

}
