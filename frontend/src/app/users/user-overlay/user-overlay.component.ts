import { Component } from '@angular/core';
import { UsersComponent } from "../users.component";

@Component({
  selector: 'app-user-overlay',
  templateUrl: './user-overlay.component.html',
  styleUrls: ['./user-overlay.component.css']
})
export class UserOverlayComponent {

  isHidden = false;
  user = { firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', admin: false };

  constructor(private userComponent: UsersComponent) {}

  open() {
    this.isHidden = true;
    this.user = { firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', admin: false };
  }

  close() {
    this.isHidden = false;
  }

  onSubmit() {
    if (this.checkEmptyFields()) {
      return;
    }
    this.userComponent.addNewUser(this.user);
    this.close();
  }

  checkEmptyFields() {
    return Object.values(this.user).some(value => value === '' || value === null);
  }
}
