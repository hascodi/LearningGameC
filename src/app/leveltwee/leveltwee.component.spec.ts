import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveltweeComponent } from './leveltwee.component';

describe('LeveltweeComponent', () => {
  let component: LeveltweeComponent;
  let fixture: ComponentFixture<LeveltweeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeveltweeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveltweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
