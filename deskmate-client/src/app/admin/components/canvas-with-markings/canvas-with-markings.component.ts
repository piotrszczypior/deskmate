import {Component, EventEmitter, Input, Output,} from '@angular/core';
import {CanvasPoint, ImageCanvasComponent} from '../image-canvas/image-canvas.component';


@Component({
  selector: 'app-canvas-with-markings',
  imports: [
    ImageCanvasComponent
  ],
  templateUrl: './canvas-with-markings.component.html',
  styleUrl: './canvas-with-markings.component.scss',
})
export class CanvasWithMarkingsComponent {
  @Input({required: true})
  imageUrl: string;
  @Input()
  selectedPlaces: Point[];

  @Output()
  markedPlaces = new EventEmitter<Point[]>();

  get canvasMarks(): CanvasPoint[] {
    return this.selectedPlaces.map(mark => ({
      point: mark, color: 'red'
    }))
  }

  // clearMarkings() {
  //   this.markedPlaces.emit([]);
  // }

  markPlace(point: Point) {
    this.markedPlaces.emit([...this.selectedPlaces, point]);
  }

  deletePlace(point: Point) {
    this.markedPlaces.emit(this.selectedPlaces.filter(p => p !== point));
  }
}

export interface Point {
  x: number;
  y: number;
}
