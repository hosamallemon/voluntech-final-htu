import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { CompanyService } from './../../../service/companyServ/company.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})

export class CompanyProfileComponent implements OnInit {

  constructor(private router:Router,
    private route:ActivatedRoute,
    private companyService:CompanyService) { }

  companyName?:string;
  companyType?:string;
  logo?:string;
  phone?:string;
  url?:string;
  id?: string;
  ngOnInit(): void {
    this.companyService.userState$?.subscribe((profile)=> {
      if(profile){
        this.companyName = profile.companyName;
        this.companyType = profile.companyType;
      }
    })

    // const routeid = this.route.snapshot.paramMap.get('id');
    // if(routeid){
    //   this.id = routeid;
    //   this.companiesService.get(this.id).pipe(
    //     take(1),
    //     map(value=> value as Company)
    //   ).subscribe((data)=>{
    //     console.log("data",data);
    //     this.companyName = data.companyName;
    //     this.companyType = data.companyType;
    //     this.phone = data.phone;
    //     this.logo = data.logo;
    //     this.url = data.url;
    //   })
    // }
  }

  editProfile(){
    const routeid = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/company/profile/edit',routeid]);
  }
}
