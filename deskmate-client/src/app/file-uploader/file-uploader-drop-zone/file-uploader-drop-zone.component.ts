import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-file-uploader-drop-zone',
  imports: [FileUploadModule],
  templateUrl: './file-uploader-drop-zone.component.html',
  styleUrl: './file-uploader-drop-zone.component.scss',
})
export class FileUploaderDropZoneComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  readonly ACCEPT = 'image/*';

  @Output()
  readonly uploadedFileEmitter$ = new EventEmitter<File[]>();

  onFileSelected(event: File[]): void {
    this.uploadedFileEmitter$.emit(event);
  }

  onSelectFilesToUpload(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }
}
