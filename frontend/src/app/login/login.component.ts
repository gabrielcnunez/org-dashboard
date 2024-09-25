import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = "";
  password = "";

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    //TOD0 check if login is valid and input not empty
    //TOD0 also to navigate to company/home if admin/worker

    // Prevent submission if fields are empty
    // if (!this.email || !this.password) {
    //   return;
    // }

    // console.log("Email: " + this.email)
    // console.log("Password: " + this.password)

    //goes to homepage once verified it's a user
    //this.router.navigate(["home"]);

    let url = 'http://localhost:8080/announcements'
    let data = this.http.get(url).toPromise();
    console.log(data);
  }
}
