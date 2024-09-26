import { Component, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsOverlayComponent } from './teams-overlay/teams-overlay.component';
import { ApiService } from 'src/services/api.service';
import Team from '../models/team';




@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  
})
export class TeamsComponent {
  teams: Team[] = []

  @ViewChild(TeamsOverlayComponent) overlay!: TeamsOverlayComponent;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllTeams()
  }

  loadAllTeams() {
    // number "6" will be replaced with current company 
    this.apiService.getCompanyTeams(6)
      .then(data => {
        if (Array.isArray(data)) {
          data.forEach(item => {
            this.teams.push({
              id: item.id,
              name: item.name,
              description: item.description,
              members: item.teammates,
              projectCount: item.projectCount
            });
          });
        }

      })
      .catch(error => {
        console.log(error)
      });
  }

  onSubmit() {
    
    this.overlay.open(this.teams);
     
    
  }

  editTeam(team: Team) {
    if (team.id !== undefined) {
      let id: number = team.id
      localStorage.setItem("currTeam", String(id))
      this.router.navigate(["projects"]);
    }
  }
}
