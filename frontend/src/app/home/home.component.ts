import {Component, OnInit, ViewChild} from '@angular/core';
import { AnnouncementOverlayComponent } from './announcement-overlay/announcement-overlay.component';
import { ApiService, BasicUser, Announcement } from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(AnnouncementOverlayComponent) overlay!: AnnouncementOverlayComponent;
  announcements: any[] = []
  userData: BasicUser | undefined;
  companyId = -1;
  userId = -1;
  admin = false;
  newAnnouncement: Announcement = {
    title: '',
    message: '',
    author: {
      id: -1,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      admin: false,
      active: false,
      status: 'PENDING',
    }
  }


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.admin = this.getAdmin();
    this.companyId = this.getCompanyId();
    this.userId = this.getUserId();
    // we only need the userId
    this.userData = {
      id: this.userId,
      profile: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      admin: false,
      active: false,
      status: "PENDING",
    }
    this.newAnnouncement.author = this.userData;
    if (this.checkCompanyId() && this.checkUserId()) {
      this.loadAllAnnouncements()
    }
  }

  clickNewButton() {
    this.overlay.open();
  }

  checkCompanyId() {
    return this.companyId > -1;
  }

  getCompanyId() {
    return JSON.parse(localStorage.getItem("companyId") ?? "-1");
  }

  checkUserId() {
    return this.userId > -1;
  }

  getUserId() {
    return JSON.parse(localStorage.getItem("userId") ?? "-1");
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem("admin") ?? "false");
  }


  loadAllAnnouncements() {
    //this needs to be changed to only loading the user's company announcements
    // this.userData = this.apiService.getUserData();
    // let userCompanyId = this.userData.companies[0].id;

    this.apiService.getCompanyAnnouncements(this.companyId)
      .then(data => {

        if (Array.isArray(data)) {
          data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          data.forEach(item => {
            this.announcements.push({
              user: item.author.profile.firstName + " " + item.author.profile.lastName,
              date: new Date(item.date).toLocaleDateString(),
              description: item.message,
            });
          });
        }

      })
      .catch(error => {
        console.log(error)
      });
  }


   async addNewAnnouncement(title: string,message: string) {
    this.newAnnouncement.title = title;
    this.newAnnouncement.message = message;
    await this.apiService.createAnnouncement(this.newAnnouncement, this.companyId);
    this.announcements = []
    this.loadAllAnnouncements();
  }
}
