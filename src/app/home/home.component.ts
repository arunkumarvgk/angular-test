import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userId = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

}
