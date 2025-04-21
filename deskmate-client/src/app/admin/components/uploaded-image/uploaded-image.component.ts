import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { Image } from '../../creator/states/uploads/images.model';

@Component({
  selector: 'app-uploaded-image',
  imports: [IconComponent],
  templateUrl: './uploaded-image.component.html',
  styleUrl: './uploaded-image.component.scss',
})
export class UploadedImageComponent {
  @Input()
  image: Image;

  @Input()
  isSelected: boolean;
}
