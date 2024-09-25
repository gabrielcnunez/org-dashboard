import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Project from '../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [{
    name: 'project1',
    description: 'this is a project',
    active: true,
    team: 1
    },
    {
    name: 'project2',
    description: 'this is a project also',
    active: false,
    team: 2
    },
  {
    name: 'project3',
    description: 'this is a project',
    active: true,
    team: 1
  }]
  constructor(private router: Router) {}

  goBack() {
    

    this.router.navigate(["teams"]);
  }
}
