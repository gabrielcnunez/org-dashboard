import { Component } from '@angular/core';

@Component({
  selector: 'app-user-overlay',
  templateUrl: './user-overlay.component.html',
  styleUrls: ['./user-overlay.component.css']
})
export class UserOverlayComponent {

  isHidden = false;
  user = { firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', admin: false };

  open() {
    this.isHidden = true;
    this.user = { firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', admin: false };
  }

  close() {
    this.isHidden = false;
  }

  onSubmit() {
    if (this.checkEmptyFields()) {
      console.log("empty fields")
      return;
    }
    console.log('New User:', this.user);
    this.close();
  }

  checkEmptyFields() {
    return Object.values(this.user).some(value => value === '' || value === null);
  }
}
