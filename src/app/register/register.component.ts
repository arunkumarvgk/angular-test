import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private userService: UserService,
              private router: Router) {}

   ngOnInit() {

    /** If user is already logged in navigate to home */
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['home']);
    }

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordConfirmValidator('password', 'confirmPassword')
    });
  }

   register() {
    this.registerService.addUser({
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value}
    );

    this.router.navigate(['login']);
   }

   private passwordConfirmValidator(passwordControlName: string, confirmPasswordControlName: string) {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[passwordControlName];
        const confirmPasswordControl = formGroup.controls[confirmPasswordControlName];
        if (passwordControl.errors && ! confirmPasswordControl.errors?.passwordMismatch) {
            return;
        }
        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
    }
}
}
