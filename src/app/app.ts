import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { ProfileService } from './profile';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(private profileService:ProfileService,@Inject(PLATFORM_ID) private platformId: Object) {
    
  }
  protected readonly title = signal('angular-rendering-types');

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      //dont execute this code on express server because it cannot understand windows
    this.profileService.setCurrentUser(window.localStorage.getItem("loggedInUser"));
    }
  }

}
