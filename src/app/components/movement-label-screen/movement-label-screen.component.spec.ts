import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementLabelScreenComponent } from './movement-label-screen.component';

describe('MovementLabelScreenComponent', () => {
  let component: MovementLabelScreenComponent;
  let fixture: ComponentFixture<MovementLabelScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementLabelScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementLabelScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
