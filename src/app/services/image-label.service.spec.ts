import { TestBed } from '@angular/core/testing';

import { ImageLabelService } from './image-label.service';

describe('ImageLabelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageLabelService = TestBed.get(ImageLabelService);
    expect(service).toBeTruthy();
  });
});
