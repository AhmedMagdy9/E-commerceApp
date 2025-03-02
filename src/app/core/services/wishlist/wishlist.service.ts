import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  userToken:string = localStorage.getItem('userToken')!

  constructor( private http:HttpClient) { }


  getWishApi():Observable<any>
  {
   return this.http.get(`${inv.baseurl}/api/v1/wishlist` , {
      headers:{token:this.userToken}
    })
  }

  addToWishApi(pid:string):Observable<any>
  {

    return this.http.post(`${inv.baseurl}/api/v1/wishlist` , {'productId': pid}, {
      headers:{token:this.userToken}
    })

  }

deleteWishApi(pid:string):Observable<any>
{
  return this.http.delete(`${inv.baseurl}/api/v1/wishlist/${pid}`, {
    headers:{token:this.userToken}
  })
}

}

