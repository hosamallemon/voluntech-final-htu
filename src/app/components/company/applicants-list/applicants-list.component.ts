import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { Activity, ActivityApplicant, ActivityService } from 'src/app/service/companyServ/activity.service';
import { Volunteer, VolunteerService } from './../../../service/volunteerServ/volunteer.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.scss']
})
export class ApplicantsListComponent implements OnInit {

  displayedColumns: string[] = ['img','firstName', 'lastName', 'skills', 'city', 'approve'];
  dataSource:MatTableDataSource<ActivityApplicant> = new MatTableDataSource<ActivityApplicant>([]);

  constructor(public activitiesService: ActivityService,
    public authService: AuthService,
    private volunteerServ:VolunteerService,
    private router:Router,
    private route:ActivatedRoute) { }



    activities?: Activity[]
    // companies: Company[]
    ngOnInit(): void {

      const id = this.route.snapshot.paramMap.get('id') as string;
      this.authService.userState$.subscribe((userCredential)=> {
        this.activitiesService.getApplicant(id).subscribe((data)=> {
          console.log(data, 'before filter');
          if(data){
            this.dataSource.data = data;
            console.log(this.dataSource,'after filter');
          }
        })
      })
    }
    approve(btn:any){
      const id1 = this.route.snapshot.paramMap.get('id') as string;
      console.log(btn.id, 'btn');
      this.authService.userState$.subscribe((userCredential)=> {
        this.activitiesService.approveApplicant({id:btn.id+'',activityId:id1,approved:true}).subscribe((data)=> {
          console.log(data, 'before filter');
          // if(data){
          //   this.dataSource.data = data;
          //   console.log(this.dataSource,'after filter');
          // }
        })
      })
    }

    back(){
      this.router.navigate(['company/profile'])
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }



}
