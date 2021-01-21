import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { RegisterService, User } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeUser: string;
  private readonly KEY = 'vmware-activeuser';

  constructor(private registerService: RegisterService) {
    /** Retrives the loggedin user on page reload if the user had not logged out */
    if (localStorage.hasOwnProperty(this.KEY)) {
      this.activeUser = window.atob(localStorage.getItem(this.KEY));
    }
  }

  public getUserId(): string {
    return this.activeUser;
  }

  /**
   * Validates if the user exists.
   *
   * @param uname The user name (A Email id).
   * @param pword The Password.
   */
  public login(uname: string, pword: string): Observable<boolean> {
    const user: User = {
      username: uname,
      password: pword
    };

    /** Check againts the list of registered users */
    const isUserExists = this.registerService.validateUser(user);

    if (isUserExists) {
      this.activeUser = uname;
      localStorage.setItem(this.KEY, window.btoa(uname));
    }

    return of(isUserExists);
  }

  /**
   * Makes user inactive.
   */
  public logout(): void {
    localStorage.removeItem(this.KEY);
    this.activeUser = undefined;
  }

  /**
   * Returns true if user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.activeUser !== undefined;;
  }
}
