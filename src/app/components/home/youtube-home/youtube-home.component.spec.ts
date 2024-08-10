import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeHomeComponent } from './youtube-home.component';

describe('YoutubeHomeComponent', () => {
  let component: YoutubeHomeComponent;
  let fixture: ComponentFixture<YoutubeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
