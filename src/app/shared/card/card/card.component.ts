import { CountNumService } from './../../../core/services/countNum/count-num.service';
import {  Component,  EventEmitter,  inject, Input, OnDestroy, OnInit, Output, output } from '@angular/core';
import { Products } from '../../interfaces/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-card',
  imports: [ RouterLink , TranslatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements    OnDestroy {
 private cartService = inject(CartService)
 private wishlistService = inject(WishlistService)
 private toastrService = inject(ToastrService)
 private countNumService = inject(CountNumService)

 mySubscribeCard!:Subscription
 mySubscribeWish!:Subscription

 @Input() oneproduct!:Products 
priductID!:string[]




 addToCart(pid:string){

  this.mySubscribeCard =  this.cartService.addTOCartapi(pid).subscribe({
    next:(res)=>{
    this.toastrService.success(res.message ,' my cart ')
    this.countNumService.cartNum.next(res.numOfCartItems)
    },
    error:(err)=>{console.log(err)}
  })


}



addTowish(pid:string , icon:HTMLElement){

  this.mySubscribeWish =   this.wishlistService.addToWishApi(pid).subscribe({
    next:(res)=>{
    this.toastrService.success(res.message ,' my Wish list ')

    icon.classList.add("text-red-600")
    this.priductID = res.data
  
    },
    error:(err)=>{console.log(err)}
  })

}

 
 ngOnDestroy(): void {

  if (this.mySubscribeCard) {
    this.mySubscribeCard.unsubscribe()
    
  }
   
  if (this.mySubscribeWish) {
    this.mySubscribeWish.unsubscribe()
    
  }
   

}



}
