import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../providers/login";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router) {

  }

  ngOnInit() {
  }
  

  login() {
    this.loginService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    });
  }

}
