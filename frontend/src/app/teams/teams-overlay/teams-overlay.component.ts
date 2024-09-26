import { Component } from '@angular/core';
import Team from 'src/app/models/team';
import { ApiService } from 'src/services/api.service';
import { TeamsComponent } from '../teams.component';

@Component({
  selector: 'app-teams-overlay',
  templateUrl: './teams-overlay.component.html',
  styleUrls: ['./teams-overlay.component.css']
})
export class TeamsOverlayComponent {
  isHidden = false;
  teams: Team[] = []
  team: Team = {name: '', description: '', members: [], projectCount: 0}
  availableUsers = [{ profile: {firstName: '', lastName: '', email: ''}, active: false, admin: false, status: '' }];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllUsers()
  }

  loadAllUsers() {
    // number "6" will be replaced with current company 
    this.availableUsers.pop()
    this.apiService.getCompanyUsers(6)
      .then(data => {
        if (Array.isArray(data)) {
          data.forEach(item => {
            this.availableUsers.push({
              profile: {firstName: item.profile.firstName,
                lastName: item.profile.lastName,
                email: item.profile.email,},
              
              active: item.active,
              admin: item.isAdmin,
              status: item.status
            });
          });
        }

      })
      .catch(error => {
        console.log(error)
      });
  }

  open(teams: Team[]) {
    this.isHidden = true;
    this.teams = teams
  }

  close() {
    this.isHidden = false;
  }

  onSubmit() {
    if (this.checkEmptyFields()) {
      console.log("empty fields")
      return;
    }
    this.teams.push(this.team)
    
    // add team to backend
    this.team = {name: '', description: '', members: [], projectCount: 0}
    this.close()
    
  }

  create() {
    
  }

  checkEmptyFields() {
    return Object.values(this.team).some(value => value === '' || value === null);
  }
  
  addMember(member: string) {
    
    this.team.members.push(this.availableUsers.filter((user) => user.profile.firstName == member)[0])
  }


  removeMember(member: string) {
    const index = this.team.members.indexOf(this.team.members.filter((user) =>user.profile.firstName == member)[0], 0);
    if (index > -1) {
      this.team.members.splice(index, 1);
    }
  }
}
