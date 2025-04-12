import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { ImageCanvasComponent } from '../../components/image-canvas/image-canvas.component';

@Component({
  selector: 'app-office-layout-creator',
  imports: [MatTabGroup, MatTab, FileUploaderComponent, ImageCanvasComponent],
  templateUrl: './office-layout-creator.component.html',
  styleUrl: './office-layout-creator.component.scss',
})
export class OfficeLayoutCreatorComponent {
  private _imagesUrls: { [key: string]: string } = {};

  get imagesUrls(): { [key: string]: string } {
    return this._imagesUrls;
  }

  //TODO: one file instead of an array
  onFileSelected(files: File[]) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this._imagesUrls[files[0].name] = e.target?.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onFilesReload(event: CdkDragDrop<string[]>) {
    const entries = Object.entries(this._imagesUrls);
    const [movedItem] = entries.splice(event.previousIndex, 1);
    entries.splice(event.currentIndex, 0, movedItem);

    this._imagesUrls = Object.fromEntries(entries);
  }

  protected onFileDeleted(file: File) {
    delete this._imagesUrls[file.name];
  }

  protected getAllImagesNames(): string[] {
    return Object.keys(this._imagesUrls);
  }
}
