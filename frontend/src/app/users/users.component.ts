import {Component, OnInit, ViewChild} from '@angular/core';
import { UserOverlayComponent } from './user-overlay/user-overlay.component';
import {ApiService, BasicUser, Profile, Credentials} from "src/services/api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  //users = [{ name: '', email: '', active: false, admin: false, status: '' }];
  users: BasicUser[] = [];

  loggedIn = true;
  showUsers = false;

  credentials: Credentials  = {
    "username": "temporaryceoofwaystar",
    "password": "idontgetpaidenoughforthis"
  }

  @ViewChild(UserOverlayComponent) overlay!: UserOverlayComponent;

  ngOnInit() {
    //this.loadAllUsers()
    if (this.loggedIn === true) {
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
    this.apiService.getUsers(this.credentials)
    .then(data => {
      this.users = data;
    })
    .then(() => this.showUsers = true)
    .then(() => console.log(this.users))
    .catch(error => {
      console.error(error);
    });
  }

  // loadAllUsers() {
  //   this.users = [
  //     { name: 'Chris Purnell', email: 'yocrizzle@gmail.com', active: true, admin: true, status: 'JOINED' },
  //     { name: 'Kenny Worth', email: 'kmoney@gmail.com', active: true, admin: true, status: 'JOINED' },
  //     { name: 'Will Marttala', email: 'wamizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
  //     { name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', active: false, admin: false, status: 'PENDING' }
  //   ];
  // }

  // TODO
  addNewUser(newUser: any) {
    //let name = newUser.firstname + ' ' + newUser.lastname;
    //this.users.unshift({ name: name, email: newUser.email, active: true, admin: newUser.admin, status: 'JOINED' });
  }
}

