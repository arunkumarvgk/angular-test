import { Injectable, OnDestroy } from '@angular/core';

/**
 * User Entity.
 */
export interface User {
  username: string;
  password: string;
}

/**
 * A Service class that stores all the users registered in the local storage
 * which later used while Authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnDestroy {

  readonly KEY = 'vmware-test-users';

  constructor() { }

  /**
   * Adds the user to the users list in local storage.
   *
   * @param user The User information to be saved.
   */
  public addUser(user: User): void {
    let usrs = [];
    if (localStorage.hasOwnProperty(this.KEY)) {
      usrs = JSON.parse(localStorage.getItem(this.KEY));
    }

    usrs.push(window.btoa(user.username + ':' + user.password));
    localStorage.setItem(this.KEY, JSON.stringify(usrs));
  }

  /**
   * Returns true if user exists.
   *
   * @param user The User information from the login page.
   */
  public validateUser(user: User): boolean {
    let usrs: User[] = [];
    if (localStorage.hasOwnProperty(this.KEY)) {
      usrs = JSON.parse(localStorage.getItem(this.KEY));
      const userFound =  usrs.find((u: any) => {
        const decryptedUser = window.atob(u).split(':');
        return decryptedUser[0] === user.username && decryptedUser[1] === user.password;
      });

      return !! userFound;
    }
    return false;
  }

  ngOnDestroy(): void {
    /** Clear storage on destroy */
    localStorage.removeItem(this.KEY);
  }
}
