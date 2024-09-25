import {Component, OnInit, ViewChild} from '@angular/core';
import { AnnouncementOverlayComponent } from './announcement-overlay/announcement-overlay.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(AnnouncementOverlayComponent) overlay!: AnnouncementOverlayComponent;
  announcements = [{ user: '', date: '', description: '' }]

  ngOnInit() {
    this.loadAllAnnouncements()
  }

  clickNewButton() {
    this.overlay.open();
  }

  loadAllAnnouncements() {
    this.announcements = [
      { user: 'John Doe1', date: 'September 23, 2024', description: 'This is a description inside of the announcement card1.' },
      { user: 'John Doe2', date: 'September 23, 2024', description: 'This is a description inside of the announcement card2.' },
      { user: 'John Doe3', date: 'September 23, 2024', description: 'This is a description inside of the announcement card3.' },
      { user: 'John Doe4', date: 'September 23, 2024', description: 'This is a description inside of the announcement card4.' },
    ]
  }

  addNewAnnouncement(message: string) {
    //get current user and date from backend
    this.announcements.unshift({ user: '', date: '', description: message });
  }
}
