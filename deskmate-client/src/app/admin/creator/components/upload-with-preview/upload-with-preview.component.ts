import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ImageCanvasComponent } from '../../../components/image-canvas/image-canvas.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Image } from '../../states/uploads/images.model';
import { ImagesQuery } from '../../states/uploads/images.query';
import { ImagesService } from '../../states/uploads/images.service';

@Component({
  selector: 'app-upload-with-preview',
  imports: [FileUploaderComponent, MatTabGroup, ImageCanvasComponent, MatTab, IconComponent, NgIf, AsyncPipe],
  templateUrl: './upload-with-preview.component.html',
  styleUrl: './upload-with-preview.component.scss',
})
export class UploadWithPreviewComponent {
  @Output()
  onPreviousState = new EventEmitter();

  @Output()
  onNextState = new EventEmitter();

  constructor(
    private readonly imagesService: ImagesService,
    private readonly imagesQuery: ImagesQuery
  ) {}

  get images(): Observable<Image[]> {
    return this.imagesQuery.selectAll();
  }

  onFileSelected(files: File[]): void {
    this.imagesService.storeFile(files);
  }

  onFilesReload(event: CdkDragDrop<string[]>): void {
    this.imagesService.reorderFiles(event.previousIndex, event.currentIndex);
  }

  onFileDeleted(file: File): void {
    this.imagesService.deleteFile(file.name);
  }

  onPreviousStateClick($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.onPreviousState.emit();
  }

  onNextStateClick($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.onNextState.emit();
  }
}
