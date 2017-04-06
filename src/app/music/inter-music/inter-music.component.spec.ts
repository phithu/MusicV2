import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterMusicComponent } from './inter-music.component';

describe('InterMusicComponent', () => {
  let component: InterMusicComponent;
  let fixture: ComponentFixture<InterMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
