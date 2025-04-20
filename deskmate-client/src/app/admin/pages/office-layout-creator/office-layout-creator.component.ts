import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { ImageCanvasComponent } from '../../components/image-canvas/image-canvas.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ImagesService } from '../../creator-states/images.service';
import { ImagesQuery } from '../../creator-states/images.query';
import { AsyncPipe, NgIf } from '@angular/common';
import { Image } from '../../creator-states/images.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-office-layout-creator',
  imports: [MatTabGroup, MatTab, FileUploaderComponent, ImageCanvasComponent, IconComponent, AsyncPipe, NgIf],
  templateUrl: './office-layout-creator.component.html',
  styleUrl: './office-layout-creator.component.scss',
})
export class OfficeLayoutCreatorComponent {
  constructor(
    private readonly router: Router,
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

  onBack(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    void this.router.navigate(['admin-dashboard']);
  }
}
