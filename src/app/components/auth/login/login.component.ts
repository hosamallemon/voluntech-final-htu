import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, Validators,FormBuilder} from '@angular/forms';
import { AuthService } from '../../../service/authServ/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
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
