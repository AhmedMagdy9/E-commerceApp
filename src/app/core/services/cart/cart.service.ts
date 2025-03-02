
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class CartService  {

  


  



constructor( private http:HttpClient) { 
}


  addTOCartapi(pid:string):Observable<any>
  {
  

    
    return  this.http.post(`${inv.baseurl}/api/v1/cart` , {'productId': pid} )

  }

  getAllCartapi():Observable<any>
  {

 
    return  this.http.get(`${inv.baseurl}/api/v1/cart` )
  }

  updateProductApi(pid:string , count:Number):Observable<any>{

    return this.http.put(`${inv.baseurl}/api/v1/cart/${pid}` , {'count' : count} )
  }

  removeProductApi(pid:string):Observable<any>
  {

    return  this.http.delete(`${inv.baseurl}/api/v1/cart/${pid}` )

  }

  clearCart():Observable<any>
  {

    return this.http.delete(`${inv.baseurl}/api/v1/cart` )

  }

}
