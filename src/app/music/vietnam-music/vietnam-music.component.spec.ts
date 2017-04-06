import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VietnamMusicComponent } from './vietnam-music.component';

describe('VietnamMusicComponent', () => {
  let component: VietnamMusicComponent;
  let fixture: ComponentFixture<VietnamMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VietnamMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VietnamMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
