import {Component, EventEmitter, Output} from '@angular/core';
import {FileUploaderDropZoneComponent} from './file-uploader-drop-zone/file-uploader-drop-zone.component';
import {IconComponent} from '../icon/icon.component';


@Component({
  selector: 'app-file-uploader',
  imports: [FileUploaderDropZoneComponent, IconComponent],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @Output()
  uploadedFilesEmitter = new EventEmitter<File[]>();

  @Output()
  deletedFileEmitter = new EventEmitter<File>();

  private _files: File[] = [];

  get files(): File[] {
    return this._files;
  }

  uploadedFiles($event: File[]): void {
    this._files = [...this._files, ...$event];
    this.uploadedFilesEmitter.emit($event);
  }

  deletedFile($event: File) {
    this._files = this._files.filter(file => file !== $event);
    this.deletedFileEmitter.emit($event);
  }
}
