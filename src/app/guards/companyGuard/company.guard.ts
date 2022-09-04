import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CompanyService } from './../../service/companyServ/company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  constructor(private commpanyService: CompanyService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.commpanyService.isLoggedInCompany$.pipe(
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
