import { Component } from '@angular/core';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { ImageCanvasComponent } from './image-canvas/image-canvas.component';

@Component({
  selector: 'app-office-layout-creator',
  imports: [FileUploaderComponent, ImageCanvasComponent],
  templateUrl: './office-layout-creator.component.html',
  styleUrl: './office-layout-creator.component.scss',
})
export class OfficeLayoutCreatorComponent {
  imageUrl: string | null = null;

  onFileSelected(files: File[]) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }
}
