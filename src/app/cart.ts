import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartData } from './models/cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  constructor(private http:HttpClient){}

  getCarts(userId:number):Observable<{carts:CartData[]}>{
    return this.http.get<{carts:CartData[]}>(`https://dummyjson.com/carts/user/${userId}`);
  }
}
