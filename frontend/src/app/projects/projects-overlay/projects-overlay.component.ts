import { Component } from '@angular/core';
import { ProjectsComponent } from "../projects.component";
import { ApiService } from 'src/services/api.service';
import Project from 'src/app/models/project';

export interface ProjectRequest {
  name: string,
  description: string,
  active: boolean
}

@Component({
  selector: 'app-projects-overlay',
  templateUrl: './projects-overlay.component.html',
  styleUrls: ['./projects-overlay.component.css']
})
export class ProjectsOverlayComponent {
  isHidden = false;
  edit = false;
  projects: Project[] = []
  project: Project = {name: '', description: '', active: true}

  selectedStatus: boolean | null = null

  constructor(private projectsComponent: ProjectsComponent, private apiService: ApiService) {}


  open(edit: boolean, projects: Project[]) {
    this.projects = projects
    this.isHidden = true;
    this.edit = edit;
  }

  close() {
    this.isHidden = false;
    this.edit = false;
    this.project = {name: '', description: '', active: true}
    this.selectedStatus = null
  }

  setActiveStatus(status: boolean) {
    this.project.active = status;
    this.selectedStatus = status;
  }

  onSubmit() {
    if (this.checkEmptyFields()) {
      console.log("empty fields")
      return;
    }

    if (this.edit) {
      this.projectsComponent.updateProject(this.project)
    } else {
      this.projects.push(this.project)
      this.create()
    }

    this.close()
  }

  checkEmptyFields() {
    return Object.values(this.project).some(value => value === '' || value === null);
  }

  create() {
    let createProject: ProjectRequest = {
      name: this.project.name,
      description: this.project.description,
      active: this.project.active
    }
    this.apiService.createProject(createProject,Number(this.getCompanyId()),Number(localStorage.getItem("currTeam")))
      .then(data => console.log(data))
  }

  getCompanyId() {
    return JSON.parse(localStorage.getItem("companyId") ?? "-1");
  }

  
}
