import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, take } from 'rxjs';
import { AuthService } from 'src/app/service/authServ/auth.service';
import { PicUploadService } from 'src/app/service/picture-upload/pic-upload.service';
import { Volunteer, VolunteerService } from 'src/app/service/volunteerServ/volunteer.service';
import { switchMap } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-volunteer-edit-profile',
  templateUrl: './volunteer-edit-profile.component.html',
  styleUrls: ['./volunteer-edit-profile.component.scss']
})
export class VolunteerEditProfileComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredskills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = ['HTML', 'Css', 'JavaSript', 'Angular', 'Git','Php','Asp'];
  profile?:Volunteer;
  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  constructor(
    private volunService:VolunteerService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    public authService:AuthService,
    private uploadService:PicUploadService,) {
      this.filteredskills = this.skillsCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allSkills.slice())),
      );
    }

  profileInfo = this.fb.group({
    firstName:this.fb.control('',[Validators.required,Validators.maxLength(12)]),
    lastName:this.fb.control('',[Validators.required,Validators.maxLength(12)]),
    phone:this.fb.control('',[Validators.required,Validators.maxLength(15)]),
    experiences:this.fb.control(''),
    skills:this.fb.control([]),
    courses:this.fb.control(''),
    city:this.fb.control(''),
    email:this.fb.control(''),
    range: this.fb.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),

  })

  get email(){
    return this.profileInfo.controls.email;
  }
  // get password(){
  //   return this.profileInfo.controls.password;
  // }

  submit(){
    this.authService.userState$.pipe(
      switchMap(user=> this.volunService.update({
        uid: user?.uid,
        firstName: this.profileInfo.value.firstName+'',
        lastName: this.profileInfo.value.lastName+'',
        email: user?.email+'',
        phone: this.profileInfo.value.phone+'',
        experiences: this.profileInfo.value.experiences+'',
        skills: this.skills,
        courses: this.profileInfo.value.courses+'',
        range:{...this.profileInfo.value.range},
        city: this.profileInfo.value.city+'',
      }))
    ).subscribe(()=> {
        console.log('update was successfull');
        this.router.navigate(['/volunteer']);
    });
  }
  changePic(event : Event){
    const input = <HTMLInputElement> event.target;
    const obj = input?.files?.[0] as File;
    this.uploadService.uploadImage(obj,"volunteerPic").subscribe();
}
  back(){
    this.router.navigate(['/volunteer/profile']);
  }
  ngOnInit(): void {

    this.volunService.userState$?.subscribe((data)=> {
      if(data){
        // this.profile=data;
        this.profileInfo.controls['firstName'].setValue(data.firstName+'');
        this.profileInfo.controls['lastName'].setValue(data.lastName+'');
        this.profileInfo.controls['phone'].setValue(data.phone+'');
        this.profileInfo.controls['city'].setValue(data.city+'');
        this.profileInfo.controls['email'].setValue(data.email+'');
        this.profileInfo.controls['phone'].setValue(data.phone+'');

        // this.profileInfo.setValue({
        //   firstName:data.firstName+'',
        //   lastName:data.lastName+'',
        //   phone:data.phone+'',
        //   experiences:data.experiences+'',
        //   skills:data.skills+'',
        //   courses:data.courses+'',
        //   range:{start:'19/02/2222'.toDate(),end:'dsad'},
        //   city:data.city+'',
        //   email:data.email+'',
        // });
      }
    })

  }

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
