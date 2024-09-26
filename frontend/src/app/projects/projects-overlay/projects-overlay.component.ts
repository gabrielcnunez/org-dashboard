import { Component } from '@angular/core';
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


  open(edit: boolean) {
    this.isHidden = true;
    this.edit = edit;
  }

  close() {
    this.isHidden = false;
    this.edit = false;
    this.project = {name: '', description: '', active: true}
  }

  onSubmit() {
    if (this.checkEmptyFields()) {
      console.log("empty fields")
      return;
    }
    this.close()
  }

  checkEmptyFields() {
    return Object.values(this.project).some(value => value === '' || value === null);
  }

  
}
