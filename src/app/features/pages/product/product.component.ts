import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Products } from '../../../shared/interfaces/products';
import { Subscription } from 'rxjs';
import { CardComponent } from "../../../shared/card/card/card.component";
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  imports: [CardComponent , FormsModule , TranslatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {


  private  ProductService = inject(ProductService)

  allProduct: Products[] =[]
  mySubscribeGetAll!:Subscription
  searchInput:string = ''
  
  
   ngOnInit(): void {
   
   this.getAllProd()
  
   }
  
  
  getAllProd(){
    this.ProductService.getAllProduct().subscribe({
      next : (res)=>{
        this.allProduct = res.data
      },
      error : (err)=>{console.log(err)}
    })
  }
  
  ngOnDestroy(): void {
  
   if (this.mySubscribeGetAll) {
    
    this.mySubscribeGetAll.unsubscribe()
   }
     
   
  
  }



}
