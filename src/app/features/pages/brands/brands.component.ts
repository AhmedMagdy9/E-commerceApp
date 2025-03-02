import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/services/checkOut/brands/brands.service';
import { Interbrands } from '../../../shared/interfaces/brands/interbrands';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-brands',
  imports: [ TranslatePipe , DatePipe ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy {
  private brandsService:BrandsService = inject(BrandsService)

  allBrands:Interbrands[] = []
  specBrands!:Interbrands 
  iscome:boolean = false

  getSubscription!:Subscription
  spesSubscription!:Subscription





  ngOnInit(): void {
    this.getAllBrands()
  }




  getAllBrands(){
   this.getSubscription =  this.brandsService.getAllBrandsApi().subscribe({
      next : (res)=>{
     
    
        this.allBrands = res.data
       
        
      },
      error : (err)=>{console.log(err)}
    })
  }


  getSpecBrand(brandID:any){
   this.spesSubscription =  this.brandsService.getSpecBrandsApi(brandID).subscribe({
    next : (res)=>{
    this.specBrands = res.data
    this.iscome = true
    
      },
      error : (err)=>{console.log(err)}
    })

  }

  cancelSpec(){
    this.iscome = false
  
  }


ngOnDestroy(): void {
  this.getSubscription.unsubscribe()

  if (this.spesSubscription) {
    this.spesSubscription.unsubscribe()
    
  }
}


}
