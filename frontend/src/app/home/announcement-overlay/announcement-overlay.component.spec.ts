import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementOverlayComponent } from './announcement-overlay.component';

describe('AnnouncementOverlayComponent', () => {
  let component: AnnouncementOverlayComponent;
  let fixture: ComponentFixture<AnnouncementOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
