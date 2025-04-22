import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCanvasWithZoom } from './image-canvas-with-zoom.component';

describe('CanvasAnnotatorComponent', () => {
  let component: ImageCanvasWithZoom;
  let fixture: ComponentFixture<ImageCanvasWithZoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCanvasWithZoom],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCanvasWithZoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
