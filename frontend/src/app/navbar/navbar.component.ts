import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHidden = true;

  constructor(private router: Router) { }

  ngOnInit() {
    //hides navbar if route is in the login/company page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHidden = (this.router.url === "/" || this.router.url === "/company");
      }
    });
  }

  clicked() {
    // console.log("nav button clicked")
  }

}
