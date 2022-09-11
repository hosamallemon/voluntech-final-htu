import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/authServ/auth.service';
import { switchMap } from 'rxjs';
import { VolunteerService } from '../../../../service/volunteerServ/volunteer.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-volunteer-registration',
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.scss']
})
export class VolunteerRegistrationComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private volunteerservice:VolunteerService,
    private toast: HotToastService,) { }

  registerForm = this.fb.group({
    firstName:this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    lastName:this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    email:this.fb.control('',[Validators.required,Validators.email]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    skills:[],
    courses:'',
    availableTime:'',
    experiences:'',
    phone:'',
    city:'',
  })

  get email(){
    return this.registerForm.controls.email;
  }
  get password(){
    return this.registerForm.controls.password;
  }
  get firstName(){
    return this.registerForm.controls.firstName;
  }
  get lastName(){
    return this.registerForm.controls.lastName;
  }

  submit(){
    const formValue = this.registerForm.value;
    this.authService.signUp(formValue.email+'', formValue.password+'', )
    .pipe(
        switchMap((data)=> {

            return this.volunteerservice.create({
              uid: data.user?.uid,
              firstName: this.registerForm.value.firstName+'',
              lastName: this.registerForm.value.lastName+'',
              email: data.user?.email + '',
              city: this.registerForm.value.city+'',
              phone: this.registerForm.value.phone+'',
              courses: this.registerForm.value.courses+'',
              experiences: this.registerForm.value.experiences+'',
              // range: this.registerForm.value.phone+'',
              skills: this.registerForm.value.skills,

            })

        }),
        this.toast.observe({
          loading: 'Registering User ...',
          success: 'Succesfully Registered',
          error:(error)=> 'This error Happened: '+error
        })
    )
    .subscribe({
      next: ()=>{
          this.router.navigate(['volunteer']);
    },
    error: (error)=> console.log(error)
  }
    );
}

  // submit(){
  //   // debugger
  //   console.log(this.email);
  //   console.log(this.password);
  //   this.AuthService.signIn(this.email.value+'',this.password.value+'').subscribe({
  //     next:(data)=>{
  //       this.router.navigate(['company/profile/PYNoWu62W3VmMekoZEeO']);
  //     },
  //     error:(error)=>{
  //       alert(error)
  //     }
  //   })
  // }

  ngOnInit(): void {
  }

}
