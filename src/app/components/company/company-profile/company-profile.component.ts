import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { CompanyService } from './../../../service/companyServ/company.service';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { PicUploadService } from 'src/app/service/picture-upload/pic-upload.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})

export class CompanyProfileComponent implements OnInit {

  constructor(private router:Router,
    private route:ActivatedRoute,
    public companyService:CompanyService,
    public authService:AuthService,
    private uploadService:PicUploadService) { }

  companyName?:string;
  companyType?:string;
  logo?:string;
  phone?:string;
  url?:string;
  id?: string;
  email?:string;
  ngOnInit(): void {
    this.companyService.userState$?.subscribe((profile)=> {
      if(profile){
        this.companyName = profile.companyName;
        this.companyType = profile.companyType;
        this.phone = profile.phone;
        this.email = profile.email;
        this.url = profile.url;

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

  submit(event : Event){
    const input = <HTMLInputElement> event.target;
    const obj = input?.files?.[0] as File;
    this.uploadService.uploadImage(obj,'companyPic').subscribe();
}
  editProfile(){
    // const routeid = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/company/profile/edit']);
  }
  createProfile(){
    this.router.navigate(['/company/create-activity']);
  }
  activities(){
    this.router.navigate(['/company/activities']);
  }
}
