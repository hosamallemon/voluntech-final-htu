import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-type-layout',
  templateUrl: './register-type-layout.component.html',
  styleUrls: ['./register-type-layout.component.scss']
})
export class RegisterTypeLayoutComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'volunteer',
            link: 'type/volunteer',
            index: 0
        }, {
            label: 'company',
            link: 'type/company',
            index: 1
        },
    ];
}


  ngOnInit(): void {
  }

}
