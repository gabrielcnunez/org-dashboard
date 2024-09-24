import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  onSubmit() {
    //TODO check if login is valid and input not empty
    //TODO also to navigate to company/home if admin/worker

    this.router.navigate(["home"]);
  }
}
