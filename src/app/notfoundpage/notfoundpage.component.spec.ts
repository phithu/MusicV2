import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundpageComponent } from './notfoundpage.component';

describe('NotfoundpageComponent', () => {
  let component: NotfoundpageComponent;
  let fixture: ComponentFixture<NotfoundpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotfoundpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
