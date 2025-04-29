import {Component} from '@angular/core';
import {FileUploaderComponent} from '../shared/components/file-uploader/file-uploader.component';
import {ImageCanvasComponent} from '../admin/components/image-canvas/image-canvas.component';


@Component({
  selector: 'app-demo',
  imports: [FileUploaderComponent, ImageCanvasComponent],
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
