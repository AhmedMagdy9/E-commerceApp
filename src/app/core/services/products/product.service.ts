import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';


@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor( private http:HttpClient) { }



getAllProduct():Observable <any>
{

 return this.http.get(`${inv.baseurl}/api/v1/products`)

}


getSpecProduct(PID:string | null):Observable <any>
{
 
  return this.http.get(`${inv.baseurl}/api/v1/products/${PID}`)
}

}
