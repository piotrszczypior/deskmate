import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DeskAnnotation } from '../../model/DeskAnnotation';

@Component({
  selector: 'app-image-canvas',
  imports: [],
  templateUrl: './image-canvas.component.html',
  styleUrl: './image-canvas.component.scss',
})
export class ImageCanvasComponent implements OnInit {
  @ViewChild('image') officeImage!: ElementRef<HTMLImageElement>;

  @Input({ required: true })
  imageUrl!: string;

  desks: DeskAnnotation[] = [];

  ngOnInit(): void {
    this.desks = [];
  }

  addDesk(event: MouseEvent): void {
    const image = this.officeImage.nativeElement;
    const imageBoundaries = image.getBoundingClientRect();

    const positionX = event.clientX - imageBoundaries.left;
    const positionY = event.clientY - imageBoundaries.top;

    const desk: DeskAnnotation = {
      x: positionX,
      y: positionY,
      id: this.desks.length,
    };
    this.desks.push(desk);
  }

  removeDesk(desk: DeskAnnotation, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const index = this.desks.indexOf(desk, 0);
    this.desks.splice(index, 1);
  }
}
