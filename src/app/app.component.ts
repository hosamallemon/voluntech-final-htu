import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/authServ/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voluntech';

  constructor(private router: Router, public authService: AuthService){

  }
  login(){
    this.router.navigate(['login']);
  }
  logout(){
    this.authService.signOut().subscribe(()=> {
      this.router.navigate(['']);
    });
  }
}
