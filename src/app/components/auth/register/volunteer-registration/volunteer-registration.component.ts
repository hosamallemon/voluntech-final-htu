import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { switchMap } from 'rxjs';
import { VolunteerService } from './../../../../volunteer.service';

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
    private volunteerservice:VolunteerService) { }

  registerForm = this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)])
  })
  get email(){
    return this.registerForm.controls.email;
  }
  get password(){
    return this.registerForm.controls.password;
  }

  submit(){
    const formValue = this.registerForm.value;
    this.authService.signUp(formValue.email+'', formValue.password+'')
    .pipe(
        switchMap((data)=> {

            return this.volunteerservice.create({
              uid: data.user?.uid,
              email: data.user?.email + ''
            })

        }),
        // this.toast.observe({
        //   loading: 'Registering User ...',
        //   success: 'Succesfully Registered',
        //   error:(error)=> 'This error Happened: '+error
        // })
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
