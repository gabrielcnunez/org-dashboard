import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Company } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  userData: any;
  loginError: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    localStorage.clear();
  }

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.apiService
      .postUserLogin(credentials)
      .then((response) => {
        if (response) {
          this.loginError = false;
          this.userData = response;
          this.saveUserToLocalStorage();

          if (this.userData.admin) {
            this.router.navigate(['company']);
          } else {
            this.router.navigate(['home']);
          }
        } else {
          this.loginError = true;
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        this.loginError = true;
      });
  }

  private saveUserToLocalStorage() {

    const credentials = {
      username: this.username,
      password: this.password
    };

    const companyData = this.userData.companies;
    let companies: number[] = [];

    if (companyData !== undefined && companyData !== null) {
      this.userData.companies.map((company: Company) => companies.push(company.id))
    }

    localStorage.setItem('admin', JSON.stringify(this.userData.admin));
    localStorage.setItem('credentials', JSON.stringify(credentials));
    localStorage.setItem('companies', JSON.stringify(companies));
    localStorage.setItem('companyId', JSON.stringify(this.userData.companies[0].id));
    localStorage.setItem('userId', JSON.stringify(this.userData.id));
    localStorage.setItem('firstName', JSON.stringify(this.userData.profile.firstName));
    localStorage.setItem('lastName', JSON.stringify(this.userData.profile.lastName));
  }

  private logStoredValues() {
    console.log('Stored admin:', localStorage.getItem('admin'));
    console.log('Stored credentials:', localStorage.getItem('credentials'));
    console.log('Stored companyId:', localStorage.getItem('companyId'));
    console.log('Stored userId:', localStorage.getItem('userId'));
    console.log('Stored firstName:', localStorage.getItem('firstName'));
    console.log('Stored lastName:', localStorage.getItem('lastName'));
  }
}
