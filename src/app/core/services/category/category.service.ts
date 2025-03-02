import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inv } from '../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   constructor(private http:HttpClient) { }
  
  
    getAllCatApi():Observable <any>
    {
  
      return this.http.get(`${inv.baseurl}/api/v1/categories`)
  
    }
  
    getSpecCatApi(catID:string):Observable<any>
    {
      return this.http.get(`${inv.baseurl}/api/v1/categories/${catID}/subcategories`)
    }
  
   
  
}
