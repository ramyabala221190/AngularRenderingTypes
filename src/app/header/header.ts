import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../profile';
import { User } from '../models/user.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private router: Router, private profileService: ProfileService, @Inject(PLATFORM_ID) private platformId: Object) { }

  currentUser = signal<null | string>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.profileService.getCurrentUser().pipe(
        tap((user: string | null) => {
          console.log(user);
          this.currentUser.set(user !== null ? user : window.localStorage.getItem("loggedInUser"))
        })
      ).subscribe();
    }
  }

  logout() {
    window.localStorage.removeItem("loggedInUser");
    this.profileService.setCurrentUser(null);
    this.router.navigate(['login']);
  }
}
