import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private currentUser=new BehaviorSubject<string|null>(null);

  setCurrentUser(user:string|null){
     this.currentUser.next(user)
  }

  getCurrentUser(){
    return this.currentUser.asObservable();
  }

}
