import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { VolunteerService } from '../../service/volunteerServ/volunteer.service';

@Injectable({
  providedIn: 'root'
})
export class VolunteerGuard implements CanActivate {
  constructor(private volunteerservice: VolunteerService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.volunteerservice.isLoggedInVolunteer$.pipe(
        map((isLoggedIn)=> {
          if(!isLoggedIn){
            this.router.navigate(['/not-authorized']);
            return false;
          }
          else {
            return true;
          }
        })
      );
  }

}
