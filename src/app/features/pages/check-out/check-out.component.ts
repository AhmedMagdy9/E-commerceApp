
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../core/services/checkOut/orders.service';
import {  Subscription, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnDestroy  {

private order = inject(OrdersService)
private activatedRoute = inject(ActivatedRoute)
private toastrService  = inject(ToastrService)
private router  = inject(Router)
cartID!:string
mySubscribeApi!:Subscription
mySubscribeUlr!:Subscription
mySubscribeTimer!:Subscription




checkOutForm:FormGroup = new FormGroup({
  details : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) , Validators.pattern(/^[a-zA-Z_]{3,20}$/)]),
 phone : new FormControl(null ,[Validators.required , Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  city : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10) , Validators.pattern(/^[a-zA-Z_]{3,16}$/)]),
  
  
})

checkOut(){


this.mySubscribeUlr =   this.activatedRoute.paramMap.subscribe((p)=>{

    this.cartID =  p.get('cartID')!
})

if (this.checkOutForm.valid) {
  this.mySubscribeApi = this.order.checkOutApi(this.cartID , this.checkOutForm.value).subscribe({
    next : (res)=>{

   

      window.location.href = res.session.url
   
  
    },
    error : (err)=>{
      console.log(err)
      if(err.ok === false)
        {
          this.toastrService.error('There are no products in the cart.')
          
   this.mySubscribeTimer =  timer(2000).subscribe(()=>{
      this.router.navigate(['/cart'])
     })
        }
  
    }
  })
  
  
}else if(this.checkOutForm.invalid)
{
  this.toastrService.warning('plase inter your details')
}


 
}

cashOrder(){
  
this.mySubscribeUlr =   this.activatedRoute.paramMap.subscribe((p)=>{

  this.cartID =  p.get('cartID')!
})



if (this.checkOutForm.valid) {
  this.mySubscribeApi = this.order.cashOrderApi(this.cartID , this.checkOutForm.value).subscribe({
    next : (res)=>{
     
  if(res.status === 'success'){
    this.toastrService.success('It has been paid successfully.')
  
  
    this.mySubscribeTimer = timer(3000).subscribe(()=>{
      this.router.navigate(['/allorders'])
     })
  
  
  }
    },
    error : (err)=>{
      console.log(err)
      if(err.ok === false)
        {
          this.toastrService.error('There are no products in the cart.')
        
  this.mySubscribeTimer =  timer(3000).subscribe(()=>{
      this.router.navigate(['/home'])
     })
        }
  
    }
  })
  
}else if(this.checkOutForm.invalid)
{
  this.toastrService.warning('plase inter your details')
}
}

ngOnDestroy(): void {
  if (this.mySubscribeApi ) {
    
    this.mySubscribeApi.unsubscribe()
   
  }
  if (this.mySubscribeUlr ) {
    
    this.mySubscribeUlr.unsubscribe()
   
  }
  if (this.mySubscribeTimer ) {
    
    this.mySubscribeTimer.unsubscribe()
   
  }

}


}


