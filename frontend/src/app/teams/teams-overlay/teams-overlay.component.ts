import { Component } from '@angular/core';
import Team from 'src/app/models/team';
import { ApiService } from 'src/services/api.service';
import { TeamsComponent } from '../teams.component';

export interface Credentials {
  username: string;
  password: string;
}

export interface Member {
  id: number
}

export interface CreateTeam {
  credentials: Credentials,
  name: string,
  description: string,
  teammateIds: number[],
  companyId: number
}

@Component({
  selector: 'app-teams-overlay',
  templateUrl: './teams-overlay.component.html',
  styleUrls: ['./teams-overlay.component.css']
})
export class TeamsOverlayComponent {
  isHidden = false;
  teams: Team[] = []
  team: Team = {name: '', description: '', members: [], projectCount: 0}
  availableUsers = [{id: "", profile: {firstName: '', lastName: '', email: ''}, active: false, admin: false, status: '' }];
  error: boolean = false;
  errorMessage: string = ''

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllUsers()
  }

  loadAllUsers() {
    this.availableUsers.pop()
    this.apiService.getCompanyUsers(this.getCompanyId())
      .then(data => {
        if (Array.isArray(data)) {
          data.forEach(item => {
            this.availableUsers.push({
              id: item.id,
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
      this.error = true;
      this.errorMessage = 'Teams must have a name, description, and at least one member!'
      return;
    }
    if (!this.validateTeam(this.team.members)) {
      this.error = true;
      this.errorMessage = 'This team already exists! Please update members to create a unique team.'
      return
    }

    this.teams.push(this.team)
    this.create()
    this.team = {name: '', description: '', members: [], projectCount: 0}
    this.close()
  }

  create() {
    let createTeam: CreateTeam = {
    credentials : JSON.parse(String(localStorage.getItem("credentials"))),
    name : this.team.name,
    teammateIds : this.team.members.map(member => Number(member.id)),
    description : this.team.description,
    companyId : this.getCompanyId()
    }
    this.apiService.addNewTeam(createTeam)
      .then(data => console.log(data))
  }

  checkEmptyFields() {
    this.error = false;
    this.errorMessage = '';
    return Object.values(this.team).some(value => value === '' || value === null) || this.team.members.length === 0;
  }
  
  addMember(memberId: string) {
    const selectedMember = this.availableUsers.find((user) => user.id === memberId);

    if (selectedMember && !this.team.members.some((m) => m.id === selectedMember.id)) {
      this.team.members.push(selectedMember);
    } else {
      console.log("Member is already in the team or does not exist.");
    }
  }


  removeMember(memberId: string) {
    const index = this.team.members.findIndex((user) => user.id === memberId);
    
    if (index > -1) {
      this.team.members.splice(index, 1);
    }
  }

  validateTeam(members: Member[]) {
    this.error = false;
    this.errorMessage = '';
    const memberIds = members.map(member => Number(member.id)).sort((a,b) => a-b)
    for (const team of this.teams) {
      const teamIds = team.members.map(member => Number(member.id)).sort((a,b) => a-b)
      if (
        memberIds.length === teamIds.length &&
        memberIds.every((e, i) => e === teamIds[i])) {
          this.error = true;
          return false;
        }
    }

    return true;
  }

  getCompanyId() {
    return JSON.parse(localStorage.getItem("companyId") ?? "-1");
  }
}
