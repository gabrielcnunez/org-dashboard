import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Project from '../models/project';
import { ProjectsOverlayComponent } from './projects-overlay/projects-overlay.component';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = []

  @ViewChild(ProjectsOverlayComponent) overlay!: ProjectsOverlayComponent;
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadAllProjects()
  }

  loadAllProjects() {
    // number "6" will be replaced with current company 
    this.apiService.getCompanyTeamProject(6, Number(localStorage.getItem("currTeam")))
      .then(data => {
        if (Array.isArray(data)) {
          data.forEach(item => {
            this.projects.push({
              name: item.name,
              description: item.description,
              active: item.active
            });
          });
        }

      })
      .catch(error => {
        console.log(error)
      });
  }


  goBack() {
    this.router.navigate(["teams"]);
  }

  newProject() {
    this.overlay.open(false);
    if (!this.overlay.checkEmptyFields()) {
      console.log(this.overlay.project)
      this.projects.push(this.overlay.project)
      // add project to backend
    }
  }

  editProject(project: Project) {
    this.overlay.open(true);
    this.overlay.project = project;
    if (!this.overlay.checkEmptyFields()) {
      console.log(this.overlay.project)
      let i: number = this.projects.indexOf(project);
      this.projects[i] = this.overlay.project;
      // add project to backend
    }
  }

}
