import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Image } from '../../states/uploads/images.model';
import { ImagesQuery } from '../../states/uploads/images.query';
import { ImagesService } from '../../states/uploads/images.service';
import { ImageCanvasWithZoom } from '../../../components/image-canvas-with-zoom/image-canvas-with-zoom.component';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';
import { CreatorNavigationButtonsGruopComponent } from '../../../components/creator-navigation-buttons-gruop/creator-navigation-buttons-gruop.component';

@Component({
  selector: 'app-upload-with-preview',
  imports: [
    FileUploaderComponent,
    NgIf,
    AsyncPipe,
    ImageCanvasWithZoom,
    MatTab,
    MatTabGroup,
    MatTabContent,
    CreatorNavigationButtonsGruopComponent,
  ],
  templateUrl: './upload-with-preview.component.html',
  styleUrl: './upload-with-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadWithPreviewComponent {
  currentTab: number = 0;

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

  onPreviousStateClick(): void {
    this.onPreviousState.emit();
  }

  onNextStateClick(): void {
    this.onNextState.emit();
  }
}
