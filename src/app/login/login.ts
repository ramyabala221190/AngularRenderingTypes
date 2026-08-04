import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Users } from '../users';
import { map, tap } from 'rxjs';
import { User } from '../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../profile';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private userService: Users, private router: Router, private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  users = signal<User[]>([]);

  loginForm = new FormGroup({
    user: new FormControl(null)
  })

  ngOnInit() {
    this.userService.getUsers().pipe(
      map((result: { users: User[] }) => result.users),
      tap((list: User[]) => { console.log(list); this.users.set(list) })
    ).subscribe();

  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      const userValue: User | null = this.loginForm.get('user')?.value || null;
      console.log(userValue);
      if (userValue !== null) {
        this.profileService.setCurrentUser(userValue);
        window.localStorage.setItem("loggedInUser", userValue != null ? String((userValue as User).id) : '');
        this.router.navigate(['cart']);
      }
    }
  }


}
