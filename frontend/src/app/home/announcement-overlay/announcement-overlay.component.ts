import { Component } from '@angular/core';
import { HomeComponent } from "../home.component";

@Component({
  selector: 'app-announcement-overlay',
  templateUrl: './announcement-overlay.component.html',
  styleUrls: ['./announcement-overlay.component.css']
})
export class AnnouncementOverlayComponent {

  isHidden = false;
  announcement = { title: '', message: '' };

  constructor(private homeComponent: HomeComponent) {}

  open() {
    this.isHidden = true;
    this.announcement = { title: '', message: '' };
  }

  close() {
    this.isHidden = false;
  }

  onSubmit() {
    if (!this.announcement.title || !this.announcement.message) {
      return; // Prevent submission if fields are empty
    }

    // console.log('New Announcement:', this.announcement);
    this.homeComponent.addNewAnnouncement(this.announcement.title, this.announcement.message);
    this.close();
  }
}
