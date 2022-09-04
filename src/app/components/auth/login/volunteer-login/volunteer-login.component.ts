import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/authServ/auth.service';

@Component({
  selector: 'app-volunteer-login',
  templateUrl: './volunteer-login.component.html',
  styleUrls: ['./volunteer-login.component.scss']
})
export class VolunteerLoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide:boolean = true;
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

        console.log(data)
        this.router.navigate(['company']);
      },
      error:(error)=>{
        alert(error)
      }
    })
  }

  ngOnInit(): void {
  }

}
