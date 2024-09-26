import { Component } from '@angular/core';
import { UsersComponent } from "../users.component";
import { Profile, Credentials, CreateUser, UserRequest} from "src/services/api.service";

@Component({
  selector: 'app-user-overlay',
  templateUrl: './user-overlay.component.html',
  styleUrls: ['./user-overlay.component.css']
})
export class UserOverlayComponent {

  isHidden = false;
  confirmPassword: string = '';
  validEntry = true;
  entryError = ""

  user: CreateUser = {
    credentials: {
      username: '',
      password: ''
    },
    user: {
      credentials: {
        username: '',
        password: ''
      },
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      admin: false,
    },
    companyId: 0
  };

  constructor(private userComponent: UsersComponent) {}

  open() {
    this.isHidden = true;
    this.user = {
      credentials: {
        username: '',
        password: ''
      },
      user: {
        credentials: {
          username: '',
          password: ''
        },
        profile: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        admin: false,
      },
      companyId: 7
    };
  }

  close() {
    this.isHidden = false;
  }

  onSubmit() {
    this.user.user.credentials.username = this.user.user.profile.email;
    console.log(this.user)
    if (this.checkEmptyFields()) {
      this.entryError = "Some fields are blank!"
      this.validEntry = false;
      return;
    }

    if (!this.passwordcheck()) {
      this.entryError = "Passwords do not match!"
      this.validEntry = false;
      return;
    }

    this.validEntry = true;
    this.entryError = "";
    this.userComponent.addNewUser(this.user);
    this.close();
  }

  passwordcheck() {
    if (this.user.user.credentials.password !== this.confirmPassword) {
      return false;
    }
    return true;
  }

  checkEmptyFields() {
    const emptyCredentials = Object.values(this.user.user.credentials).some(value => value === '' || value === null);
    const emptyProfile = Object.values(this.user.user.profile).some(value => value === '' || value === null);
    return (emptyCredentials || emptyProfile);
  }
}
