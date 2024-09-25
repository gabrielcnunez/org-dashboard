import {Component, OnInit, ViewChild} from '@angular/core';
import { UserOverlayComponent } from './user-overlay/user-overlay.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [{ name: '', email: '', active: false, admin: false, status: '' }];

  @ViewChild(UserOverlayComponent) overlay!: UserOverlayComponent;

  ngOnInit() {
    this.loadAllUsers()
  }

  clickAddButton() {
    this.overlay.open();
    if (!this.overlay.checkEmptyFields()) {
      console.log(this.overlay.user)
    }
  }

  loadAllUsers() {
    this.users = [
      { name: 'Chris Purnell', email: 'yocrizzle@gmail.com', active: true, admin: true, status: 'JOINED' },
      { name: 'Kenny Worth', email: 'kmoney@gmail.com', active: true, admin: true, status: 'JOINED' },
      { name: 'Will Marttala', email: 'wamizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
      { name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', active: false, admin: false, status: 'PENDING' }
    ];
  }

  addNewUser(newUser: any) {
    let name = newUser.firstname + ' ' + newUser.lastname;
    this.users.unshift({ name: name, email: newUser.email, active: true, admin: newUser.admin, status: 'JOINED' });
  }
}
