import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsOverlayComponent } from './teams-overlay.component';

describe('TeamsOverlayComponent', () => {
  let component: TeamsOverlayComponent;
  let fixture: ComponentFixture<TeamsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
