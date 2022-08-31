import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/authServ/auth.service';
import { switchMap } from 'rxjs';
import { CompanyService } from 'src/app/service/companyServ/company.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private companyservice:CompanyService) { }
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
            return this.companyservice.create({
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
          this.router.navigate(['company']);
    },
    error: (error)=> console.log(error)
  }
    );
}

  ngOnInit(): void {
  }

}
