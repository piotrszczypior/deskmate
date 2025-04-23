import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagesQuery } from '../../states/uploads/images.query';
import { map, Observable } from 'rxjs';
import { Image } from '../../states/uploads/images.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { UploadedImageComponent } from '../../../components/uploaded-image/uploaded-image.component';
import { FloorItemComponent } from '../../../../shared/components/floor-item/floor-item.component';
import { CanvasWithMarkingsComponent } from '../../../components/canvas-with-markings/canvas-with-markings.component';
import { CreatorNavigationButtonsGruopComponent } from '../../../components/creator-navigation-buttons-gruop/creator-navigation-buttons-gruop.component';
import { Point } from '@angular/cdk/drag-drop';
import { MarkedDesksListComponent } from '../../../components/marked-desks-list/marked-desks-list.component';
import { ImagesService } from '../../states/uploads/images.service';

@Component({
  selector: 'app-seating-annotator',
  imports: [
    NgIf,
    AsyncPipe,
    UploadedImageComponent,
    FloorItemComponent,
    CanvasWithMarkingsComponent,
    CreatorNavigationButtonsGruopComponent,
    MarkedDesksListComponent,
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
  protected highlightedPoint: Point;
  protected selectedSeats$: Observable<Point[]>;

  constructor(
    private readonly imagesQuery: ImagesQuery,
    private readonly imagesService: ImagesService
  ) {}

  get images(): Observable<Image[]> {
    return this.imagesQuery.selectAll();
  }

  ngOnInit(): void {
    this.onSelectImage(this.imagesQuery.getAll()[0]);
  }

  onSelectImage(image: Image): void {
    this.selectedImage = image;
    this.selectedSeats$ = this.imagesQuery.selectMarksByImageId(image.id).pipe(map((marks) => marks || []));
  }

  onPreviousStateClick(): void {
    this.onPreviousState.emit();
  }

  onNextStateClick(): void {
    this.onNextState.emit();
  }

  onMarkedPlaces($event: Point[]) {
    this.imagesService.storeDesksCoordinates(this.selectedImage.id, $event);
  }
}
