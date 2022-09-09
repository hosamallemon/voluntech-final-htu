import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { Activity, ActivityService } from 'src/app/service/companyServ/activity.service';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Activity[] = [


  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-company-activities-list',
  templateUrl: './company-activities-list.component.html',
  styleUrls: ['./company-activities-list.component.scss']
})
export class CompanyActivitiesListComponent implements OnInit {

  displayedColumns: string[] = ['companyName', 'name', 'skills', 'description','startDate','endDate','applicant'];
  dataSource:MatTableDataSource<Activity> = new MatTableDataSource<Activity>([]);

  constructor(public activitiesService: ActivityService, public authService: AuthService) { }
  activities?: Activity[]
  // companies: Company[]
  ngOnInit(): void {

    this.authService.userState$.subscribe((userCredential)=> {
      this.activitiesService.currentUserActvities$?.subscribe((data)=> {
        console.log(data, 'before filter');
        if(data){
          this.dataSource.data = data?.filter((value)=> {
              return value.companyId == userCredential?.uid;
          });
          console.log(this.dataSource,'after filter');
        }
      })
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
