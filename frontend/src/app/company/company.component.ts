import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService, Company } from 'src/services/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  companies: Company[] = [
  ];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllCompanies()
      .then(data => {this.companies = data})
      .catch((error) => console.log(error));
  }


  async getAllCompanies() {
    this.apiService.getAllCompanies()
    .then(data => this.companies = data)
    .catch((error) => console.log(error));
  }

  onClick(item: number) {
    //change the stored companyId to the one that user selected
    localStorage.setItem("companyId", JSON.stringify(item));
    this.router.navigate(["home"]);
  }
}
