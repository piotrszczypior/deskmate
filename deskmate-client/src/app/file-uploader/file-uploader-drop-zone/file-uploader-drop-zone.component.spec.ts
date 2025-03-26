import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';

describe('FileUploaderComponent', () => {
  let component: FileUploaderDropZoneComponent;
  let fixture: ComponentFixture<FileUploaderDropZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploaderDropZoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploaderDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
