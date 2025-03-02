import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/checkOut/orders.service';
import { AuthenSerService } from '../../../core/services/authService/authen-ser.service';
import { Iuserorder } from '../../../shared/interfaces/userorders/userorders';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorder',
  imports: [ TranslatePipe , DatePipe ],
  templateUrl: './allorder.component.html',
  styleUrl: './allorder.component.scss'
})
export class AllorderComponent implements OnInit , OnDestroy {

  private OrdersService = inject(OrdersService)
  private authenSerService = inject(AuthenSerService)

  userOrder!:Iuserorder[]

  getSubscription!:Subscription


ngOnInit(): void {
  
 
this.getAllOrder()


}

getAllOrder(){
  this.getSubscription = this.OrdersService.getuserOrders(this.authenSerService.personData.value.id).subscribe({
    next : (res)=>{
    
      this.userOrder = res
      
  
    },
    error : (err)=>{console.log(err)}
  })

}


ngOnDestroy(): void {
  this.getSubscription.unsubscribe()
}



}
