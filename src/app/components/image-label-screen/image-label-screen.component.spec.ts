import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLabelScreenComponent } from './image-label-screen.component';

describe('ImageLabelScreenComponent', () => {
  let component: ImageLabelScreenComponent;
  let fixture: ComponentFixture<ImageLabelScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageLabelScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLabelScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
