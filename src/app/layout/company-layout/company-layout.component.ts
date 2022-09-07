import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authServ/auth.service';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.scss']
})
export class CompanyLayoutComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) {

  }
  logout(){
    console.log('logoutttt')
    this.authService.signOut().subscribe(()=> {
      this.router.navigate(['']);
    });
  }
  ngOnInit(): void {
  }

}
