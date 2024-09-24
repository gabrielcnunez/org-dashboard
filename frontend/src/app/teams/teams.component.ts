import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Team from '../models/team';



@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teams: Team[] = [{
    name: 'team1',
    description: 'this is a team',
    company: 1
    },
    {
    name: 'team2',
    description: 'this is a team also',
    company: 2
    }
  ]
  constructor(private router: Router) {}

  onSubmit() {
    
  }
}
