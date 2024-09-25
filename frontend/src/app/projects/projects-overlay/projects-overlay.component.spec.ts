import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsOverlayComponent } from './projects-overlay.component';

describe('ProjectsOverlayComponent', () => {
  let component: ProjectsOverlayComponent;
  let fixture: ComponentFixture<ProjectsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
