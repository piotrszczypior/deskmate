import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploaderDropZoneComponent } from './file-uploader-drop-zone/file-uploader-drop-zone.component';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { UploadedImageComponent } from './images-drag-and-drop/uploaded-image.component';
import { Image } from '../../../admin/creator/states/uploads/images.model';

@Component({
  selector: 'app-file-uploader',
  imports: [FileUploaderDropZoneComponent, CdkDropList, UploadedImageComponent, CdkDrag],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent implements OnInit {
  @Input({ transform: (value: Image[]): File[] => value.map((v) => v.file) })
  init: File[];

  @Output()
  uploadedFilesEmitter = new EventEmitter<File[]>();

  @Output()
  filesOrderChanged = new EventEmitter<CdkDragDrop<string[]>>();

  @Output()
  deletedFileEmitter = new EventEmitter<File>();

  private _files: File[] = [];

  get files(): File[] {
    return this._files;
  }

  ngOnInit(): void {
    this._files = this.init ? this.init : [];
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
}
