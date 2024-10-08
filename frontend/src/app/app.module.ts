import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { CompanyComponent } from './company/company.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnnouncementCardComponent } from './home/announcement-card/announcement-card.component';
import { AnnouncementOverlayComponent } from './home/announcement-overlay/announcement-overlay.component';
import {FormsModule} from "@angular/forms";
import { UserOverlayComponent } from './users/user-overlay/user-overlay.component';
import { TeamsOverlayComponent } from './teams/teams-overlay/teams-overlay.component';
import { ProjectsOverlayComponent } from './projects/projects-overlay/projects-overlay.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TeamsComponent,
    ProjectsComponent,
    UsersComponent,
    CompanyComponent,
    NavbarComponent,
    AnnouncementCardComponent,
    AnnouncementOverlayComponent,
    UserOverlayComponent,
    TeamsOverlayComponent,
    ProjectsOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
