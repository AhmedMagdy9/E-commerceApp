import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Icategory} from '../../../shared/interfaces/brands/interbrands';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy {

   private categoryService:CategoryService = inject(CategoryService)

   getSubscription!:Subscription
  spescatSubscription!:Subscription
    allCat:Icategory[] = []
    allSubCat:Icategory[] = []
    subCat:boolean= false
    catname!:string
  
  
  
  
    ngOnInit(): void {
      this.getAllCat()
    }
  
  
  
  
    getAllCat(){
    this.getSubscription =  this.categoryService.getAllCatApi().subscribe({
        next : (res)=>{
       
      
          this.allCat = res.data
      
        },
        error : (err)=>{console.log(err)}
      })
    }
  
    getSpecCat(cartid:string , catname:string){

 
   this.spescatSubscription =   this.categoryService.getSpecCatApi(cartid).subscribe({
        next : (res)=>{

          this.subCat = true
          this.allSubCat = res.data
          this.catname = catname

        },
        error : (err)=>{console.log(err)}
      })
    }
  
  
   

ngOnDestroy(): void {
  this.getSubscription.unsubscribe()
  if (this.spescatSubscription) {
    this.spescatSubscription.unsubscribe()
    
  }
}


}
