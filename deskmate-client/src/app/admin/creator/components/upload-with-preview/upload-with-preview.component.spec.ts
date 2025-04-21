import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWithPreviewComponent } from './upload-with-preview.component';

describe('UploadWithPreviewComponent', () => {
  let component: UploadWithPreviewComponent;
  let fixture: ComponentFixture<UploadWithPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadWithPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadWithPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
