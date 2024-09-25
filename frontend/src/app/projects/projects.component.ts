import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Project from '../models/project';
import { ProjectsOverlayComponent } from './projects-overlay/projects-overlay.component';

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
  @ViewChild(ProjectsOverlayComponent) overlay!: ProjectsOverlayComponent;
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(["teams"]);
  }

  newProject() {
    this.overlay.open(false);
  }

  editProject(project: Project) {
    this.overlay.open(true);
  }

}
