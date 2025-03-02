import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../../shared/reUsable-comp/alerts/alert.component";
import { AuthenSerService } from '../../../../core/services/authService/authen-ser.service';
import { PlatformService } from '../../../../core/services/platform/platform.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule, AlertComponent , TranslatePipe ],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent  implements OnDestroy{

  private authenSerService = inject(AuthenSerService)
  private toastrService = inject(ToastrService)
  private router = inject(Router)
  
  email:FormControl = new FormControl(null ,[ Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ])
  code:FormControl = new FormControl(null ,[ Validators.required ])
  changepass:FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email]),
    newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]), 
  })

forget:string | null = null
isLoading:boolean = false;
emailSubscription!:Subscription
codeSubscription!:Subscription
passSubscription!:Subscription

constructor(private PlatformService:PlatformService){
  if (this.PlatformService.cheekplatform()) {
    this.forget = sessionStorage.getItem('forgetpass')

    
    
  }
}


  emailSubmit(){

    this.isLoading = true;

  this.emailSubscription =  this.authenSerService.sendEmailApi(this.email.value).subscribe({
      next:(res)=>{

     
        if (res.statusMsg === 'success') {
      this.isLoading = false
          this.forget = 'send code'
          sessionStorage.setItem('forgetpass' , this.forget)
          this.toastrService.warning(res.message)
        }
       

      },
      error:(err)=>{
        console.log(err.error.message)
        this.toastrService.warning(err.error.message)
        this.isLoading = false
      }

    })
  
  }

  codeSubmit(){
    this.isLoading = true;

 this.codeSubscription =   this.authenSerService.sendCodeApi(this.code.value).subscribe({
      next:(res)=>{
        if (res.status === 'Success') {
          this.isLoading = false
          this.forget = 'change pass'
          sessionStorage.setItem('forgetpass' , this.forget)
          this.toastrService.success(res.status)
        }
       

      },
      error:(err)=>{
        console.log(err)
        this.toastrService.warning(err.error.message)
        this.isLoading = false
      }

    })
  
  }

  sendNewPass(){

    this.isLoading = true;
    console.log(this.changepass.value)
 this.passSubscription =   this.authenSerService.sendNewPassApi(this.changepass.value).subscribe({
      next : (res)=>{
        if(res.token){

          this.isLoading = false
          localStorage.setItem('userToken' , res.token)
          this.authenSerService.saveToken()
          this.router.navigate(['/home'])
          sessionStorage.removeItem('forgetpass')
          this.forget = null
          }   
      },
      error : (err)=>{
        console.log(err)
        this.isLoading = false
    
      }
    })

  }

  reternEmail(){
    this.forget = null
    sessionStorage.removeItem('forgetpass')
  }


  ngOnDestroy(): void {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe()
      
    }
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe()
      
    }
    if (this.passSubscription) {
      this.passSubscription.unsubscribe()
      
    }
  }
}
