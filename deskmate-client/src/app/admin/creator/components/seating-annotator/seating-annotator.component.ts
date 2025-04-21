import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagesQuery } from '../../states/uploads/images.query';
import { Observable } from 'rxjs';
import { Image } from '../../states/uploads/images.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { UploadedImageComponent } from '../../../components/uploaded-image/uploaded-image.component';
import { ImageCanvasComponent } from '../../../components/image-canvas/image-canvas.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-seating-annotator',
  imports: [NgIf, AsyncPipe, UploadedImageComponent, ImageCanvasComponent, IconComponent],
  templateUrl: './seating-annotator.component.html',
  styleUrl: './seating-annotator.component.scss',
})
export class SeatingAnnotatorComponent implements OnInit {
  @Output()
  onPreviousState = new EventEmitter();
  @Output()
  onNextState = new EventEmitter();
  protected selectedImage: Image;

  constructor(private readonly imagesQuery: ImagesQuery) {}

  get images(): Observable<Image[]> {
    return this.imagesQuery.selectAll();
  }

  onSelectImage(image: Image): void {
    this.selectedImage = image;
  }

  ngOnInit(): void {
    this.selectedImage = this.imagesQuery.getAll()[0];
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
