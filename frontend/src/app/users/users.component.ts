import {Component, OnInit, ViewChild} from '@angular/core';
import { UserOverlayComponent } from './user-overlay/user-overlay.component';
import {ApiService, BasicUser, Profile, Credentials, CreateUser, UserRequest} from "src/services/api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  //users = [{ name: '', email: '', active: false, admin: false, status: '' }];
  users: BasicUser[] = [];

  admin = false;
  showUsers = false;
  companyId = -1;

  adminCredentials: Credentials  = {"username": "","password": ""}

  @ViewChild(UserOverlayComponent) overlay!: UserOverlayComponent;

  ngOnInit() {
    this.admin = this.getAdmin();
    this.adminCredentials = this.getCredentials();
    this.companyId = this.getCompanyId();
    if (this.admin === true && this.checkCredentials() && this.checkCompanyId()) {
      this.getAllUsers();
    }
  }

  clickAddButton() {
    this.overlay.open();
    if (!this.overlay.checkEmptyFields()) {
      console.log(this.overlay.user)
    }
  }

  async getAllUsers() {
    this.apiService.getCompanyUsers(this.companyId)
    // this.apiService.getUsers(this.adminCredentials)
    .then(data => {

      if (Array.isArray(data)) {
        data.forEach(item => {
          this.users.push({
            id: item.id,
            profile: item.profile,
            active: item.active,
            admin: item.admin,
            status: item.status,
          });
        });
      }

    })
    .then(() => this.showUsers = true)
    .then(() => console.log(this.users))
    .catch(error => {
      this.showUsers = false;
      console.error(error);
    });
  }

  checkCompanyId() {
    return this.companyId > -1;
  }

  checkCredentials() {
    return !Object.values(this.adminCredentials).some(value => value === '' || value === null);
  }

  getCredentials() {
    console.log(localStorage.getItem("credentials"))
    return JSON.parse(localStorage.getItem("credentials") ?? "'username':'','password':''");
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem("admin") ?? "false");
  }

  getCompanyId() {
    return JSON.parse(localStorage.getItem("companyId") ?? "-1");
  }

  async addNewUser(newUser: any) {
    newUser.companyId = this.companyId;
    // These credentials are the currently logged-in admin's credentials
    // The user's credentials are at newUser.user.credentials
    newUser.credentials = this.adminCredentials;
    await this.apiService.createUser(newUser);
    this.getAllUsers();
  }
}

