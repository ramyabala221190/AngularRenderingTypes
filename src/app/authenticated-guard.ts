import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const isUserLoggedIn=window.localStorage.getItem('loggedInUser');
  const router:Router=inject(Router);
  if(isUserLoggedIn){
    return true;
  }
  router.navigate(['login']);
  return false;

  
};
