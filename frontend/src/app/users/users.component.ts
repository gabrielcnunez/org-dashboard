import { Component, ViewChild } from '@angular/core';
import { UserOverlayComponent } from './user-overlay/user-overlay.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users = [
    { name: 'Chris Purnell', email: 'yocrizzle@gmail.com', active: true, admin: true, status: 'JOINED' },
    { name: 'Kenny Worth', email: 'kmoney@gmail.com', active: true, admin: true, status: 'JOINED' },
    { name: 'Will Marttala', email: 'wamizzle@gmail.com', active: false, admin: false, status: 'PENDING' },
    { name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', active: false, admin: false, status: 'PENDING' }
  ];

  @ViewChild(UserOverlayComponent) overlay!: UserOverlayComponent;

  clickAddButton() {
    this.overlay.open();
    if (!this.overlay.checkEmptyFields()) {
      console.log(this.overlay.user)
    }
  }
}
