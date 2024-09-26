import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  userData: any;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    localStorage.clear();
  }

  onSubmit() {
    //TOD0 check if login is valid and input not empty
    //TOD0 also to navigate to company/home if admin/worker

    // Prevent submission if fields are empty
    // if (!this.username || !this.password) {
    //   return;
    // }
    // console.log("Email: " + this.username)
    // console.log("Password: " + this.password)

    this.doLogin();

    //goes to homepage once verified it's a user
    // this.router.navigate(["home"]);
  }

  doLogin() {
    //real way
    let credentials = {
      "username": this.username,
      "password": this.password,
    }
    //testing purposes
    let credentials2 = {  //not admin
      "username": "pinky",
      "password": "futureceoofwaystar",
    }
    let credentials3 = {  //admin
      "username": "temporaryceoofwaystar",
      "password": "idontgetpaidenoughforthis"
    }

    this.apiService.postUserLogin(credentials2)
      .then(() => {

        this.userData = this.apiService.getUserData();
        this.saveUserToLocalStorage();

        //navigate to company/home if admin/worker
        if (this.userData.admin) {
          this.router.navigate(["company"]);
        } else {
          this.router.navigate(["home"]);
        }

      })
      .catch(error => {
        console.error(error);
      });

  }

  private saveUserToLocalStorage() {
    localStorage.setItem("admin", JSON.stringify(this.userData.admin));
    localStorage.setItem("companyId", JSON.stringify(this.userData.companies[0].id));
    localStorage.setItem("userId", JSON.stringify(this.userData.id));
    localStorage.setItem("firstName", JSON.stringify(this.userData.profile.firstName));
  }
}
