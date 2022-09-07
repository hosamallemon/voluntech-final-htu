import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authServ/auth.service';

@Component({
  selector: 'app-volunteer-layout',
  templateUrl: './volunteer-layout.component.html',
  styleUrls: ['./volunteer-layout.component.scss']
})
export class VolunteerLayoutComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) {

  }
  ngOnInit(): void {
  }
  logout(){
    console.log('logoutttt')
    this.authService.signOut().subscribe(()=> {
      this.router.navigate(['']);
    });
  }

}
