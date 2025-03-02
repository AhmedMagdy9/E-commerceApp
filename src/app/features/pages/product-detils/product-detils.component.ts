import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../core/services/cart/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/products/product.service';
import { Products } from '../../../shared/interfaces/products';
import { Subscription } from 'rxjs';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { CountNumService } from '../../../core/services/countNum/count-num.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-product-detils',
  imports: [CarouselModule , TranslatePipe ]  ,
  templateUrl: './product-detils.component.html',
  styleUrl: './product-detils.component.scss'
})
export class ProductDetilsComponent implements OnInit , OnDestroy  {
  private activatedRoute = inject(ActivatedRoute)
   private ProductService = inject(ProductService)
   private PlatformService = inject(PlatformService)
   private CartService = inject(CartService)
   private ToastrService = inject(ToastrService)
   private countNumService = inject(CountNumService)
     customOptions: OwlOptions = {
       loop: true,
       mouseDrag: true,
       touchDrag: false,
       pullDrag: false,
       rtl : true,
       dots: false,
       navSpeed: 700,
       navText: ['', ''],
       responsive: {
         0: {
           items: 1
         },
         400: {
           items: 1
         },
         740: {
           items: 1
         },
         940: {
           items: 1
         }
       },
       nav: true
     }
   

  pid!:string | null
  itemDetils!:Products
  mySubscribeGetSpec!:Subscription
  mySubscribe!:Subscription


ngOnInit(): void {
this.specProduct()

 

}

specProduct(){
  if (this.PlatformService.cheekplatform()) {
    this.activatedRoute.paramMap.subscribe((p)=>{
  
      this.pid =  p.get('id')
  
  })
  
  this.mySubscribeGetSpec = this.ProductService.getSpecProduct(this.pid).subscribe({
    next: (res)=>{
  
      this.itemDetils = res.data
  
    
    },
    error: (err)=>{console.log(err)}
  })
  
  }
}

addToCart(pid:string){

  this.mySubscribe =  this.CartService.addTOCartapi(pid).subscribe({
    next:(res)=>{
    this.ToastrService.success(res.message ,' my cart ')
    this.countNumService.cartNum.next(res.numOfCartItems)
    },
    error:(err)=>{console.log(err)}
  })
}



ngOnDestroy(): void {
  this.mySubscribeGetSpec.unsubscribe()
}
}


