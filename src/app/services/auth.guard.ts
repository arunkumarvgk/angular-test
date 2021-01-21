import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /** If user is already logged in navigates to current route else navigates to login page*/
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
