
import { PlatformService } from './../../../core/services/platform/platform.service';
import { Component,  inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive,  } from '@angular/router';
import { AuthenSerService } from '../../../core/services/authService/authen-ser.service';
import { Subscription } from 'rxjs';
import { DarkmodeService } from '../../../core/services/darkmode/darkmode.service';
import { CountNumService } from '../../../core/services/countNum/count-num.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-navbar',
  imports: [ RouterLink  ,RouterLinkActive , TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  ,   OnDestroy{
  private authenSerService = inject(AuthenSerService)
   

    private router = inject(Router)
    private countNumService = inject(CountNumService)
    private cartService = inject(CartService)
    private CountNumService = inject(CountNumService)
  

  isLogin:boolean =false
  mySubscribe!:Subscription
navCountNum!:number



 
  ngOnInit(): void {

     
     this.countNumService.cartNum.subscribe({
      next:(data)=>{
        this.navCountNum = data
      }
    })
  
   this.mySubscribe = this.authenSerService.personData.subscribe((res)=>{
      if (res != null) {
        this.isLogin = true
        this.getAllCart()
      }else{
      this.isLogin = false
      }
    })
 
  }

  getAllCart(){
    
      this.cartService.getAllCartapi().subscribe({
        next :(res)=>{
          this.CountNumService.cartNum.next(res.numOfCartItems)
          console.log(res.numOfCartItems)
  
        },
        error :(err)=>{console.log(err)}
      })

  
   
    }
  


  logout(){
    localStorage.removeItem('userToken')
    this.router.navigate(['/login'])
  this.authenSerService.personData.next(null)
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe()
  }
  
  

}

