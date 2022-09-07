import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { ActivityService } from 'src/app/service/companyServ/activity.service';
import { Observable, take } from 'rxjs';
import { CompanyService } from './../../../service/companyServ/company.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit,OnDestroy {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredskills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = ['HTML', 'Css', 'JavaSript', 'Angular', 'Git','Php','Asp'];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  form = this.fb.group({
    name: this.fb.control(''),
    description: this.fb.control(''),
    skillsRequired: this.fb.control([]),
    range: this.fb.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    })
  })
  constructor(private fb: FormBuilder, private activityService: ActivityService,
    private auth: AuthService,
    private router: Router,
    private companyserv:CompanyService) {

      this.filteredskills = this.skillsCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allSkills.slice())),
      );
    }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }
  back(){
    this.router.navigate(['/company']);
  }

  submit(){
    //get current authenticated user id
    //create activity for that userid
    //navigate all activities page
    console.log("my chips",this.form.get('skillsRequired'))
    this.companyserv.userState$?.pipe(take(1)).subscribe((profile)=> {
      if(profile){
        this.activityService.create({
          companyName:profile.companyName+'',
          name: this.form.value.name+'',
          companyId: profile.uid+'',
          companyType: profile.companyType+'',
          skillsRequired: this.skills,
          description: this.form.value.description+'',
          range: {...this.form.value.range}
        }).subscribe(()=> {
          //navigate to all activities page
          console.log('activity was created successfully');
          this.router.navigate(['company/activities']);
        })
      }})

    }
    // let subscriber = this.companyserv.userState$.pipe(take(1)).subscribe((userCredentials)=> {
    //   if(userCredentials){
    //     this.activityService.create({
    //       companyName:userCredentials.companyName,
    //       name: this.form.value.name+'',
    //       companyId: userCredentials.uid,
    //       description: this.form.value.description+'',
    //       range: {...this.form.value.range}
    //     }).subscribe(()=> {
    //       //navigate to all activities page
    //       console.log('activity was created successfully');
    //       this.router.navigate(['company/activities']);
    //     })
    //   }
    // });
    // let subscriber = this.auth.userState$.pipe(take(1)).subscribe((userCredentials)=> {
    //   if(userCredentials){
    //     this.activityService.create({
    //       companyName:userCredentials.companyName,
    //       name: this.form.value.name+'',
    //       companyId: userCredentials.uid,
    //       description: this.form.value.description+'',
    //       range: {...this.form.value.range}
    //     }).subscribe(()=> {
    //       //navigate to all activities page
    //       console.log('activity was created successfully');
    //       this.router.navigate(['company/activities']);
    //     })
    //   }
    // });
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.skills.push(value);
      }

      // Clear the input value
      event.chipInput!.clear();

      this.skillsCtrl.setValue(null);
    }

    remove(fruit: string): void {
      const index = this.skills.indexOf(fruit);

      if (index >= 0) {
        this.skills.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.skills.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.skillsCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allSkills.filter(skills => skills.toLowerCase().includes(filterValue));
    }


}
