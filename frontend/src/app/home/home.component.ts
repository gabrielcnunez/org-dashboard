import {Component, OnInit, ViewChild} from '@angular/core';
import { AnnouncementOverlayComponent } from './announcement-overlay/announcement-overlay.component';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(AnnouncementOverlayComponent) overlay!: AnnouncementOverlayComponent;
  // announcements = [{ user: '', date: '', description: '' }]
  announcements: any[] = []
  userData: any;


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllAnnouncements()
  }

  clickNewButton() {
    this.overlay.open();
  }

  loadAllAnnouncements() {
    //this needs to be changed to only loading the user's company announcements
    this.userData = this.apiService.getUserData();
    let userCompanyId = this.userData.companies[0].id;

    this.apiService.getCompanyAnnouncements(userCompanyId)
      .then(data => {

        if (Array.isArray(data)) {
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

  addNewAnnouncement(message: string) {
    //get current user and date from backend and post to save in backend
    this.announcements.unshift({ user: '', date: '', description: message });
  }
}
