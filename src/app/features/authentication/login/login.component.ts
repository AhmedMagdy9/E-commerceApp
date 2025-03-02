import { Component, inject, OnDestroy } from '@angular/core';
import { AuthenSerService } from '../../../core/services/authService/authen-ser.service';
import {  Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../shared/reUsable-comp/alerts/alert.component";
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';






@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AlertComponent , RouterLink , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private authenSerService = inject(AuthenSerService) 
  private router = inject(Router)
  





  isLoading:boolean = false;
  errorMessage:string =''
  mySubscribe!:Subscription
  loginForm:FormGroup = new FormGroup({
  email : new FormControl(null ,[Validators.required , Validators.email]),
  password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]),  
  } , )





  loginSubmit(){
    if(this.loginForm.valid){
    this.isLoading = true;
   this.mySubscribe = this.authenSerService.sendLoginAPI(this.loginForm.value).subscribe({
    next : (res)=>{
    this.isLoading = false 
    if(res.message == 'success'){
    localStorage.setItem('userToken' , res.token)
    this.authenSerService.saveToken()
    this.router.navigate(['/home'])
    }   
    } ,
    error : (err)=>{
    console.log(err)   
    this.errorMessage = err.error.message 
    this.isLoading = false
    },
    })
    }
               }




     ngOnDestroy(): void {
      if (this.mySubscribe) {
        this.mySubscribe.unsubscribe()
      }
      }
}
