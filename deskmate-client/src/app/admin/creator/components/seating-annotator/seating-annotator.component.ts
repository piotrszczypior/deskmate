import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagesQuery } from '../../states/uploads/images.query';
import { Observable } from 'rxjs';
import { Image } from '../../states/uploads/images.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { UploadedImageComponent } from '../../../components/uploaded-image/uploaded-image.component';
import { FloorItemComponent } from '../../../../shared/components/floor-item/floor-item.component';
import { CanvasWithMarkingsComponent } from '../../../components/canvas-with-markings/canvas-with-markings.component';
import { CreatorNavigationButtonsGruopComponent } from '../../../components/creator-navigation-buttons-gruop/creator-navigation-buttons-gruop.component';

@Component({
  selector: 'app-seating-annotator',
  imports: [
    NgIf,
    AsyncPipe,
    UploadedImageComponent,
    FloorItemComponent,
    CanvasWithMarkingsComponent,
    CreatorNavigationButtonsGruopComponent,
  ],
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

  onPreviousStateClick(): void {
    this.onPreviousState.emit();
  }

  onNextStateClick(): void {
    this.onNextState.emit();
  }
}
