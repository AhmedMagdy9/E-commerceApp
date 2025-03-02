import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Icart } from '../../../shared/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CountNumService } from '../../../core/services/countNum/count-num.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [ RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy {
 private cartService = inject(CartService)
 private toastrService = inject(ToastrService)
 private countNumService = inject(CountNumService)

 getSubscribe!:Subscription
 removeSubscribe!:Subscription
 updateSubscribe!:Subscription
 clearSubscribe!:Subscription
 allCartProducts!:Icart[]
 totalCartPrice!:number
 cartID!:string 



ngOnInit(): void {
  this.getAllCart()
}

getAllCart(){
  
this.getSubscribe =   this.cartService.getAllCartapi().subscribe({
  next :(res)=>{
this.totalCartPrice = res.data.totalCartPrice
this.allCartProducts = res.data.products
this.cartID = res.cartId

  },
  error :(err)=>{console.log(err)}
})
}
removeProduct(pid:string){
  this.removeSubscribe = this.cartService.removeProductApi(pid).subscribe({
    next:(res)=>{
      this.toastrService.success('Deleted product is sucessfuly' , 'Delete')
      
   if (res.status = 'success') {
    this.getAllCart()
    this.countNumService.cartNum.next(res.numOfCartItems)
 
    
   }

    },
    error:(err)=>{console.log(err)}
  })
}

updateProduct( pid:string , count:number){
  this.updateSubscribe =  this.cartService.updateProductApi(pid , count).subscribe({
    next : (res)=>{
      if (res.status == 'success') {
        this.toastrService.success('your product updated' , 'my cart')
        this.getAllCart()
      }
    },
    error : (err)=>{console.log(err)}
  })
}

clearAllProduct(){

    this.clearSubscribe = this.cartService.clearCart().subscribe({
    next : (res)=>{
      if (res.message == 'success') {
        this.toastrService.success('your cart cleared' , 'my cart')
        this.getAllCart()
        this.countNumService.cartNum.next(0)
      }

    },
    error : (err)=>{console.log(err)}
  })

 
}



ngOnDestroy(): void {
  this.getSubscribe.unsubscribe()



  if (this.removeSubscribe) {
    this.removeSubscribe.unsubscribe()
  }
  if (this.clearSubscribe) {
    this.clearSubscribe.unsubscribe()
  }
  if ( this.updateSubscribe) {
    this.updateSubscribe.unsubscribe()
  }


}

}