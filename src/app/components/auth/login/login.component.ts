import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, Validators,FormBuilder} from '@angular/forms';
import { AuthService } from '../../../service/authServ/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide:boolean = true;

  constructor(private fb:FormBuilder,
    private AuthService:AuthService,
    private router:Router,
    private toast: HotToastService,) { }

  loginForm = this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    type:this.fb.control('',[Validators.required]),
  })

  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  submit(){
    this.AuthService.signIn(this.email.value+'',this.password.value+'')
    .pipe(
      this.toast.observe({
        loading: 'Signing in ...',
        success: 'Welcome to Application',
        error:(error)=> 'This error Happened: '+error
      })
    )
    .subscribe({
      next:(data)=>{
        console.log(data)
        if(this.loginForm.value.type == 'company')
        this.router.navigate(['company']);
        else{
          this.router.navigate(['volunteer']);
        }
      },
      // error:(error)=>{
      //   alert(error)
      // }
    })
  }


  ngOnInit(): void {
  }

}
