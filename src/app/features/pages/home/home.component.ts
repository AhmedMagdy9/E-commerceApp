import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from "../../../shared/card/card/card.component";
import { ProductService } from '../../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { Products } from '../../../shared/interfaces/products';
import { FormsModule } from '@angular/forms';
import { OwlcarouselComponent } from "../../../shared/reUsable-comp/owlCur/owlcarousel/owlcarousel.component";
import { LoopcrsalComponent } from "../../../shared/reUsable-comp/owlCur/owlcarousel/loopcarousal/loopcrsal/loopcrsal.component";




@Component({
  selector: 'app-home',
  imports: [CardComponent, FormsModule, OwlcarouselComponent, LoopcrsalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
 
})
export class HomeComponent implements OnInit , OnDestroy {
 private  ProductService = inject(ProductService)








allProduct: Products[] =[]

mySubscribeGetAll!:Subscription
  searchInput:string = ''







 ngOnInit(): void {
 
  this.mySubscribeGetAll = this.ProductService.getAllProduct().subscribe({
    next : (res)=>{
      this.allProduct = res.data
     
  
    },
    error : (err)=>{console.log(err)}
  })

 


 }


 
ngOnDestroy(): void {


    this.mySubscribeGetAll.unsubscribe()
  

}
}
