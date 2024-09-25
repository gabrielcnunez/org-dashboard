import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Team from '../models/team';




@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  
})
export class TeamsComponent {
  teams: Team[] = [{
    name: 'team1',
    description: 'this is a team',
    company: 1,
    members: ["tim", "kenny", "burt"]
    },
    {
    name: 'team2',
    description: 'this is a team also',
    company: 2,
    members: []
    },
  {
    name: 'team1',
    description: 'this is a team',
    company: 1,
    members: []
    },
    {
    name: 'team2',
    description: 'this is a team also',
    company: 2,
    members: []
    }
  ]
  constructor(private router: Router) {}

  onSubmit() {
  }

  editTeam(i: number) {
    this.router.navigate(["projects"]);
  }
}
