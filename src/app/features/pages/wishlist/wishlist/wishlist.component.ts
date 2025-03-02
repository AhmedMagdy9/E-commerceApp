import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import {  Iwish } from '../../../../shared/interfaces/icart';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart/cart.service';
import { CountNumService } from '../../../../core/services/countNum/count-num.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit , OnDestroy {
private wishlistService:WishlistService = inject(WishlistService)
private toastrService = inject(ToastrService)
private CartService = inject(CartService)
private countNumService = inject(CountNumService)


removeSubscribe!:Subscription
getSubscribe!:Subscription
addSubscribe!:Subscription

wishlistProduct: Iwish[] = []


ngOnInit(): void {
 this.getwish()
}

getwish(){
 this.getSubscribe =  this.wishlistService.getWishApi().subscribe({
    next:(res)=>{
      this.wishlistProduct = res.data
    },
    error:(err)=>{console.log(err)}
  })
}

deleteWishProduct(pid:string){
  this.removeSubscribe = this.wishlistService.deleteWishApi(pid).subscribe({
    next:(res)=>{
     
   if (res.status = 'success') {
    this.getwish()
    this.toastrService.error(res.message)
   }

    },
    error:(err)=>{console.log(err)}
  })
}


addToCart(pid:string){

this.addSubscribe =  this.CartService.addTOCartapi(pid).subscribe({
    next:(res)=>{
    this.toastrService.success(res.message ,' my cart ')
   this.deleteWishProduct(pid)
   this.countNumService.cartNum.next(res.numOfCartItems)
    },
    error:(err)=>{console.log(err)}
  })
}


ngOnDestroy(): void {
  this.getSubscribe.unsubscribe()
  if (this.removeSubscribe) {
    this.removeSubscribe.unsubscribe()
    
  }
  if (this.addSubscribe) {
    this.addSubscribe.unsubscribe()
    
  }
}


}
