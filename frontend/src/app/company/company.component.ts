import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  companies = [
    { id: 6, name: 'Waystar|ROYCO' },
    { id: 7, name: 'Cook Systems' }
  ];

  constructor(private router: Router) {}

  onClick(item: number) {
    //change the stored companyId to the one that user selected
    localStorage.setItem("companyId", JSON.stringify(item));
    this.router.navigate(["home"]);
  }
}
