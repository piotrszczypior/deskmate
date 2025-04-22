import { Component } from '@angular/core';
import { FileUploaderComponent } from '../shared/components/file-uploader/file-uploader.component';
import { ImageCanvasWithZoom } from '../admin/components/image-canvas-with-zoom/image-canvas-with-zoom.component';

@Component({
  selector: 'app-demo',
  imports: [ImageCanvasWithZoom, FileUploaderComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
})
export class DemoComponent {
  imageUrl: string;

  onUploadedImage(files: File[]) {
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }
}
