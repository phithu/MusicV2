import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMusicComponent } from './list-music.component';

describe('ListMusicComponent', () => {
  let component: ListMusicComponent;
  let fixture: ComponentFixture<ListMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
