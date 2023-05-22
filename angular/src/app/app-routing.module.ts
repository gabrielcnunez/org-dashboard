import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { AnnouncementsComponent } from './announcements/announcements.component'; \
import { CompanyComponent } from './company/company.component'
import { ProjectsComponent } from './projects/projects.component'
import { TeamsComponent } from './teams/teams.component'
import { UsersComponent } from './users/users.component'

const routes: Routes = [
  { path: '', component: AnnouncementsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'users', component: UsersComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
