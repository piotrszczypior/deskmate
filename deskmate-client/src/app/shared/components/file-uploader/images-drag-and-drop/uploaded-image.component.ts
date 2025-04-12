import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-uploaded-image',
  imports: [IconComponent],
  templateUrl: './uploaded-image.component.html',
  styleUrl: './uploaded-image.component.scss',
})
export class UploadedImageComponent {
  @Input()
  image: File | undefined;

  @Input()
  floorNumber: number | undefined;

  @Output()
  onDeletedImage = new EventEmitter<void>();

  deletedFile($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.onDeletedImage.emit();
  }
}
