import { Component, ViewChild} from '@angular/core';
import { AnnouncementOverlayComponent } from './announcement-overlay/announcement-overlay.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild(AnnouncementOverlayComponent) overlay!: AnnouncementOverlayComponent;

  clickNewButton() {
    this.overlay.open();
  }
}
