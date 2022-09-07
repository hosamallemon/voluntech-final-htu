import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/authServ/auth.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) {

  }


  login(){
    this.router.navigate(['login']);
  }
  logout(){
    this.authService.signOut().subscribe(()=> {
      this.router.navigate(['']);
    });
  }
  ngOnInit(): void {

  }

}
