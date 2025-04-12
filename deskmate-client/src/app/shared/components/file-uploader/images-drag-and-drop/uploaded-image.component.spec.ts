import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedImageComponent } from './uploaded-image.component';

describe('UplodedImageComponent', () => {
  let component: UploadedImageComponent;
  let fixture: ComponentFixture<UploadedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadedImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
