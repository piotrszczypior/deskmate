import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CanvasConfig, CanvasService } from '../../canvas.service';

@Component({
  selector: 'app-canvas-with-markings',
  imports: [],
  templateUrl: './canvas-with-markings.component.html',
  styleUrl: './canvas-with-markings.component.scss',
})
export class CanvasWithMarkingsComponent implements AfterViewInit, OnChanges {
  @Input({ required: true })
  imageUrl: string;

  @Output()
  markedPlaces = new EventEmitter<Point[]>();

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input({ required: true })
  selectedPlaces: Point[];

  private image = new Image();
  private context!: CanvasRenderingContext2D;
  private CANVAS_CONFIG: CanvasConfig;
  private marks: Point[] = [];

  constructor(private readonly canvasService: CanvasService) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d')!;

    this.image.onload = () => {
      this.resizeCanvas();
      this.marks = this.selectedPlaces;
      this.draw();
    };
    this.image.src = this.imageUrl;

    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPlaces']) {
      this.marks = [...this.selectedPlaces];
    }

    if (changes['imageUrl'] && !changes['imageUrl'].firstChange && this.context) {
      this.image.onload = () => {
        this.resizeCanvas();
        this.marks = [...this.selectedPlaces];
        this.draw();
      };
      this.image.src = this.imageUrl;
    }
  }

  clearMarkings(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.marks = [];
    this.markedPlaces.emit(this.marks);
    this.draw();
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    this.CANVAS_CONFIG = this.canvasService.calculateImageInCenterOfCanvas(canvas.width, canvas.height, this.image);

    this.context.drawImage(
      this.image,
      this.CANVAS_CONFIG.imgOffsetX,
      this.CANVAS_CONFIG.imgOffsetY,
      this.CANVAS_CONFIG.scaledWidth,
      this.CANVAS_CONFIG.scaledHeight
    );

    this.context.fillStyle = 'red';
    for (const pt of this.marks) {
      this.context.beginPath();
      this.context.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
      this.context.fill();
      this.context.closePath();
    }
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;

    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }

  private getMousePosition(evt: MouseEvent): Point {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  private onMouseDown(event: MouseEvent): void {
    const pointPositions = this.getMousePosition(event);

    if (this.checkIfPointIsWithinImage(pointPositions)) {
      this.marks.push(pointPositions);
      this.draw();
      this.markedPlaces.emit(this.marks);
    }
  }

  private checkIfPointIsWithinImage(pointPositions: Point) {
    const isXWithin =
      pointPositions.x >= this.CANVAS_CONFIG.imgOffsetX &&
      pointPositions.x <= this.CANVAS_CONFIG.imgOffsetX + this.CANVAS_CONFIG.scaledWidth;

    const isYWithin =
      pointPositions.y >= this.CANVAS_CONFIG.imgOffsetY &&
      pointPositions.y <= this.CANVAS_CONFIG.imgOffsetY + this.CANVAS_CONFIG.scaledHeight;

    return isXWithin && isYWithin;
  }
}

export interface Point {
  x: number;
  y: number;
}
