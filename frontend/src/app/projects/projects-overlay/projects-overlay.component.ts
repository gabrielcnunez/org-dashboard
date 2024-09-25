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
  project: Project = {name: '', description: '', active: true, team: 0}


  open(edit: boolean) {
    this.isHidden = true;
    this.edit = edit;
  }

  close() {
    this.isHidden = false;
    this.edit = false;
  }

  onSubmit() {
    
  }

  checkEmptyFields() {
    
  }

  
}
