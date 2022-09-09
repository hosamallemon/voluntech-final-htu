import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { ActivityService } from 'src/app/service/companyServ/activity.service';
import { Volunteer, VolunteerService } from './../../../service/volunteerServ/volunteer.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.scss']
})
export class ApplicantsListComponent implements OnInit {

  displayedColumns: string[] = ['companyName', 'name', 'skills', 'description','startDate','endDate','applicant'];
  dataSource:MatTableDataSource<Volunteer> = new MatTableDataSource<Volunteer>([]);

  constructor(public activitiesService: ActivityService,
    public authService: AuthService,
    private volunteerServ:VolunteerService) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
