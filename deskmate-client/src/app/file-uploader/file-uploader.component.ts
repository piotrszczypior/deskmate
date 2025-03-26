import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploaderDropZoneComponent } from './file-uploader-drop-zone/file-uploader-drop-zone.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-file-uploader',
  imports: [FileUploaderDropZoneComponent, IconComponent],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  files: File[] | undefined;

  @Output()
  uploadedFilesEmitter = new EventEmitter<File[]>();

  uploadedFiles($event: File[]): void {
    this.files = $event;
    this.uploadedFilesEmitter.emit($event);
  }
}
