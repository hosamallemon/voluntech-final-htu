import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb:FormBuilder,private AuthService:AuthService,private router:Router) { }
  loginForm = this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)])
  })
  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  submit(){
    // debugger
    console.log(this.email);
    console.log(this.password);
    this.AuthService.signIn(this.email.value+'',this.password.value+'').subscribe({
      next:(data)=>{
        this.router.navigate(['company/profile/PYNoWu62W3VmMekoZEeO']);
      },
      error:(error)=>{
        alert(error)
      }
    })
  }

  ngOnInit(): void {
  }

}
