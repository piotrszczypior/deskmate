import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Point} from '../canvas-with-markings/canvas-with-markings.component';
import {CanvasService} from '../../canvas.service';


@Component({
  selector: 'app-image-canvas',
  imports: [],
  templateUrl: './image-canvas.component.html',
  styleUrl: './image-canvas.component.scss',
})
export class ImageCanvasComponent implements AfterViewInit, OnChanges {

  @Input()
  allowPointing: boolean = false;
  @Input({required: true})
  imageUrl!: string;
  @Input()
  points: CanvasPoint[] = [];

  @Output()
  canvasClick = new EventEmitter<Point>();
  @Output()
  pointClick = new EventEmitter<Point>();

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private image = new Image();
  private context!: CanvasRenderingContext2D;
  private scale = 1.0;
  private MIN_SCALE = 0.1;
  private MAX_SCALE = 5.0;
  private offsetX = 0;
  private offsetY = 0;
  private isDragging = false;
  private lastX = 0;
  private lastY = 0;
  private readonly ZOOM_SPEED = 0.1;
  private readonly POINT_RADIUS = 20;
  private cursorMode: CursorMode = CursorMode.MOVE;

  constructor(private readonly canvasService: CanvasService) {
  }

  ngAfterViewInit(): void {
    this.toggleMoving();
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d')!;

    this.image.onload = () => {
      this.resizeCanvas();
      this.initializeImageInCenterOfCanvas();
      this.draw();
    };
    this.image.src = this.imageUrl;
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('wheel', this.onWheel.bind(this));
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['points'] && !changes['points'].firstChange) {
      this.draw();
    }

    if (changes['imageUrl'] && !changes['imageUrl'].firstChange && this.context) {
      this.image.onload = () => {
        this.resizeCanvas();
        this.initializeImageInCenterOfCanvas();
        this.draw();
      };
      this.image.src = this.imageUrl;
    }
  }

  public resetView(): void {
    this.initializeImageInCenterOfCanvas();
    this.draw();
  }

  public zoomIn(): void {
    this.scale = Math.min(this.scale + this.ZOOM_SPEED, this.MAX_SCALE);
    this.draw();
  }

  public zoomOut(): void {
    this.scale = Math.max(this.scale - this.ZOOM_SPEED, this.MIN_SCALE);
    this.draw();
  }

  protected isCursorInMoveMode(): boolean {
    return this.cursorMode === CursorMode.MOVE;
  }

  protected toggleMoving() {
    this.cursorMode = CursorMode.MOVE;
    this.canvasRef.nativeElement.style.cursor = 'grab';
  }

  protected togglePointing() {
    this.cursorMode = CursorMode.POINT;
    this.canvasRef.nativeElement.style.cursor = 'crosshair';
  }

  private arePointsCloserThan(
      point1: Point,
      point2: Point,
      distance: number
  ): boolean {
    const dx = point2.x - point1.x
    const dy = point2.y - point1.y;
    return dx * dx + dy * dy <= (distance * distance);
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;

    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = this.image.width * this.scale;
    const scaledHeight = this.image.height * this.scale;
    this.context.drawImage(
        this.image,
        this.offsetX * this.scale,
        this.offsetY * this.scale,
        scaledWidth,
        scaledHeight
    );

    this.points.forEach(pt => {
      this.context.beginPath();
      this.context.fillStyle = pt.color;
      this.context.arc(
          (pt.point.x + this.offsetX) * this.scale,
          (pt.point.y + this.offsetY) * this.scale,
          this.POINT_RADIUS * this.scale,
          0,
          Math.PI * 2);
      this.context.fill();
      this.context.closePath();
    });
  }

  private getMousePosition(evt: MouseEvent): Point {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / this.scale - this.offsetX,
      y: (evt.clientY - rect.top) / this.scale - this.offsetY,
    };
  }

  private onMouseDown(event: MouseEvent): void {

    if (this.cursorMode === CursorMode.POINT) {
      const pointPositions = this.getMousePosition(event);

      if (this.checkIfPointIsWithinImage(pointPositions)) {
        for (const point of this.points) {
          if (this.arePointsCloserThan(point.point, pointPositions, this.POINT_RADIUS)) {
            this.pointClick.emit(point.point);
            return;
          }
        }
        this.draw();
        this.canvasClick.emit(pointPositions);
      }
    } else {
      const canvas = this.canvasRef.nativeElement;
      const mousePos = this.getMousePos(canvas, event);

      this.isDragging = true;
      this.lastX = mousePos.x;
      this.lastY = mousePos.y;

      canvas.style.cursor = 'grabbing';
    }
  }

  private checkIfPointIsWithinImage(pointPositions: Point) {
    const isXWithin =
        pointPositions.x >= 0 &&
        pointPositions.x <= this.image.width;

    const isYWithin =
        pointPositions.y >= 0 &&
        pointPositions.y <= this.image.height;

    return isXWithin && isYWithin;
  }

  private getMousePos(canvas: HTMLCanvasElement, event: MouseEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private initializeImageInCenterOfCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const canvasInitConfig = this.canvasService.calculateImageInCenterOfCanvas(canvas.width, canvas.height, this.image);

    this.offsetX = canvasInitConfig.imgOffsetX;
    this.offsetY = canvasInitConfig.imgOffsetY;
    this.scale = canvasInitConfig.scale;
  }

  private onWheel(event: WheelEvent): void {
    event.preventDefault();

    const canvas = this.canvasRef.nativeElement;
    const mousePos = this.getMousePos(canvas, event);

    const mouseXOnImage = (mousePos.x - this.offsetX) / this.scale;
    const mouseYOnImage = (mousePos.y - this.offsetY) / this.scale;

    if (event.deltaY < 0) {
      this.scale = Math.min(this.scale + this.ZOOM_SPEED, this.MAX_SCALE);
    } else {
      this.scale = Math.max(this.scale - this.ZOOM_SPEED, this.MIN_SCALE);
    }

    this.offsetX = mousePos.x - mouseXOnImage * this.scale;
    this.offsetY = mousePos.y - mouseYOnImage * this.scale;

    this.draw();
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const mousePos = this.getMousePos(canvas, event);

    const dx = mousePos.x - this.lastX;
    const dy = mousePos.y - this.lastY;

    this.offsetX += dx / this.scale;
    this.offsetY += dy / this.scale;

    this.lastX = mousePos.x;
    this.lastY = mousePos.y;

    this.draw();
  }

  private onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;

    const canvas = this.canvasRef.nativeElement;
    canvas.style.cursor = 'grab';
  }
}

enum CursorMode {
  'MOVE',
  'POINT'
}

export interface CanvasPoint {
  point: Point;
  color: 'green' | 'red' | 'yellow';
}
