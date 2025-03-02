import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inv } from '../../../../shared/invauroment/inv';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }


  getAllBrandsApi():Observable <any>
  {

    return this.http.get(`${inv.baseurl}/api/v1/brands`)

  }

  getSpecBrandsApi(brandID:string):Observable<any>
  {
    return this.http.get(`${inv.baseurl}/api/v1/brands/${brandID}`)
  }


}

