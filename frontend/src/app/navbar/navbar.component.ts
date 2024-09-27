import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHidden = false;
  name = ""
  admin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    //hides navbar if route is in the login/company page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setName()
        this.setAdmin()
        this.isHidden = (this.router.url === "/" || this.router.url === "/company");
      }
    });
  }

  clicked() {
    // console.log("nav button clicked")
  }

  setName(): void {
    if (this.getAdmin()) {
      this.name = "ADMIN"
    } else {
      this.name = this.getName()
    }
  }

  setAdmin(): void {
    this.admin = this.getAdmin();
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem("admin") ?? "false");
  }

  getName() {
    return JSON.parse(<string>localStorage.getItem("firstName"));
  }

}
