import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationLoadComponent } from './animation-load.component';

describe('AnimationLoadComponent', () => {
  let component: AnimationLoadComponent;
  let fixture: ComponentFixture<AnimationLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
