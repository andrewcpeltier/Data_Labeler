import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImageDialogComponent } from './data-image-dialog.component';

describe('DataImageDialogComponent', () => {
  let component: DataImageDialogComponent;
  let fixture: ComponentFixture<DataImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
