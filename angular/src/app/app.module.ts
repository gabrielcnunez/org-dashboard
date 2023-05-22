import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { CompanyComponent } from './company/company.component'
import { ProjectsComponent } from './projects/projects.component'
import { TeamsComponent } from './teams/teams.component'
import { UsersComponent } from './users/users.component'
import { AnnouncementsComponent } from './announcements/announcements.component'
import { LoginComponent } from './login/login.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'

import { UserService } from './user.service'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CompanyComponent,
    ProjectsComponent,
    TeamsComponent,
    UsersComponent,
    AnnouncementsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
