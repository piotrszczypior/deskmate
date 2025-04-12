import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploaderDropZoneComponent } from './file-uploader-drop-zone/file-uploader-drop-zone.component';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { UploadedImageComponent } from './images-drag-and-drop/uploaded-image.component';

@Component({
  selector: 'app-file-uploader',
  imports: [FileUploaderDropZoneComponent, CdkDropList, UploadedImageComponent, CdkDrag],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @Output()
  uploadedFilesEmitter = new EventEmitter<File[]>();

  @Output()
  filesOrderChanged = new EventEmitter<CdkDragDrop<string[]>>();

  @Output()
  deletedFileEmitter = new EventEmitter<File>();

  private _files: File[] = [];

  get files(): File[] {
    console.log(this._files);
    return this._files;
  }

  uploadedFiles($event: File[]): void {
    this._files = [...this._files, ...$event];
    this.uploadedFilesEmitter.emit($event);
  }

  deletedFile($event: File) {
    this._files = this._files.filter((file) => file !== $event);
    this.deletedFileEmitter.emit($event);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this._files, event.previousIndex, event.currentIndex);
    this.filesOrderChanged.emit(event);
  }

  // confirmFloorsConfiguration($event: Event): void {
  //   this.uploadedFilesEmitter.emit(this._files);
  // }
}
