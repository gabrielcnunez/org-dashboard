import { Component } from '@angular/core';
import Team from 'src/app/models/team';

@Component({
  selector: 'app-teams-overlay',
  templateUrl: './teams-overlay.component.html',
  styleUrls: ['./teams-overlay.component.css']
})
export class TeamsOverlayComponent {
  isHidden = false;
  team: Team = {name: '', description: '', company: 0, members: ['ben']}


  open() {
    this.isHidden = true;
    
  }

  close() {
    this.isHidden = false;
  }

  onSubmit() {
    
  }

  checkEmptyFields() {
    
  }

  removeMember(member: string) {
    const index = this.team.members.indexOf(member, 0);
    if (index > -1) {
      this.team.members.splice(index, 1);
    }
  }
}
