import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {

  constructor(private http:HttpClient){}

  getUsers():Observable<{users:User[]}>{
    return this.http.get<{users:User[]}>('https://dummyjson.com/users');
  }

}
