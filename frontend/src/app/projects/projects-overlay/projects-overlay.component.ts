import { Component } from '@angular/core';
import { ProjectsComponent } from "../projects.component";
import Project from 'src/app/models/project';

@Component({
  selector: 'app-projects-overlay',
  templateUrl: './projects-overlay.component.html',
  styleUrls: ['./projects-overlay.component.css']
})
export class ProjectsOverlayComponent {
  isHidden = false;
  edit = false;
  project: Project = {name: '', description: '', active: true}
  selectedStatus: boolean | null = null

  constructor(private projectsComponent: ProjectsComponent) {}


  open(edit: boolean) {
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
      // Create a new project method goes here
    }

    this.close()
  }

  checkEmptyFields() {
    return Object.values(this.project).some(value => value === '' || value === null);
  }

  
}
