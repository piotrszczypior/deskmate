import { Component } from '@angular/core';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { ImageCanvasComponent } from './image-canvas/image-canvas.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-office-layout-creator',
  imports: [FileUploaderComponent, ImageCanvasComponent, MatTabGroup, MatTab],
  templateUrl: './office-layout-creator.component.html',
  styleUrl: './office-layout-creator.component.scss',
})
export class OfficeLayoutCreatorComponent {
  private _imagesUrls: { [key: string]: string } = {};

  get imagesUrls(): { [key: string]: string } {
    return this._imagesUrls;
  }

  onFileSelected(files: File[]) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this._imagesUrls[files[0].name] = e.target?.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  protected onFileDeleted(file: File) {
    delete this._imagesUrls[file.name];
  }

  protected getAllImagesNames(): string[] {
    return Object.keys(this._imagesUrls);
  }
}
