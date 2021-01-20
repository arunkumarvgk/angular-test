import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginFailed = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    /** If user is already logged in navigate to home */
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['home']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] // password: ['', [Validators.required, Validators.minLength(6)]]
                                          // password minLength is tested in register component
    });
  }

  login() {
    this.isLoginFailed = false;
    const uname = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.userService.login(uname, password).subscribe((response: boolean) => {
      if (response) {
        this.router.navigate(['home']);
      } else {
        this.isLoginFailed = true;
      }
    });
  }
}
