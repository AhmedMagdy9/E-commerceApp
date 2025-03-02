import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountNumService {

  constructor( private http:HttpClient) { }


  cartNum:BehaviorSubject<number> = new BehaviorSubject(0)


  
  

}
