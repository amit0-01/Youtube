import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const accessToken = userData.accessToken;
      const refreshToken = userData.refreshToken;
      const user = userData.user;

      if (accessToken && refreshToken && user) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        this.router.navigate(['']);
        return false;
      }
    } else {
      // If userDataString is not found, navigate to login or home page
      console.log(false);
      this.router.navigate(['']);
      return false;
    }
  }
}
