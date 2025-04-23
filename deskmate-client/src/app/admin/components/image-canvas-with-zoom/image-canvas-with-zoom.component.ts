import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CanvasService } from '../../canvas.service';

@Component({
  selector: 'app-image-canvas-with-zoom',
  imports: [],
  templateUrl: './image-canvas-with-zoom.component.html',
  styleUrl: './image-canvas-with-zoom.component.scss',
})
export class ImageCanvasWithZoom implements AfterViewInit, OnChanges {
  @Input({ required: true }) imageUrl: string;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ZOOM_SPEED = 0.1;

  private context!: CanvasRenderingContext2D;
  private image = new Image();
  private scale = 1.0;
  private MIN_SCALE = 0.1;
  private MAX_SCALE = 5.0;
  private offsetX = 0;
  private offsetY = 0;
  private isDragging = false;
  private lastX = 0;
  private lastY = 0;

  constructor(private readonly canvasService: CanvasService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageUrl'] && !changes['imageUrl'].firstChange && this.context) {
      this.image.onload = () => {
        this.resizeCanvas();
        this.initializeImageInCenterOfCanvas();
        this.draw();
      };
      this.image.src = this.imageUrl;
    }
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d')!;

    this.image.onload = () => {
      this.resizeCanvas();

      this.initializeImageInCenterOfCanvas();
      this.draw();
    };
    this.image.src = this.imageUrl;

    canvas.addEventListener('wheel', this.onWheel.bind(this));
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.draw();
    });
  }

  public resetView(): void {
    this.initializeImageInCenterOfCanvas();
    this.draw();
  }

  public zoomIn(): void {
    const oldScale = this.scale;
    this.scale = Math.min(this.scale + 0.1, this.MAX_SCALE);

    this.calculateImageDimensionsAfterZoom(oldScale);
  }

  public zoomOut(): void {
    const oldScale = this.scale;
    this.scale = Math.max(this.scale - 0.1, this.MIN_SCALE);

    this.calculateImageDimensionsAfterZoom(oldScale);
  }

  private calculateImageDimensionsAfterZoom(oldScale: number): void {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const zoomRatio = this.scale / oldScale;

    this.offsetX = centerX - (centerX - this.offsetX) * zoomRatio;
    this.offsetY = centerY - (centerY - this.offsetY) * zoomRatio;

    this.draw();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;

    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }

  private initializeImageInCenterOfCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const canvasInitConfig = this.canvasService.calculateImageInCenterOfCanvas(canvas.width, canvas.height, this.image);

    this.offsetX = canvasInitConfig.imgOffsetX;
    this.offsetY = canvasInitConfig.imgOffsetY;
    this.scale = canvasInitConfig.scale;
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = this.image.width * this.scale;
    const scaledHeight = this.image.height * this.scale;

    this.context.drawImage(this.image, this.offsetX, this.offsetY, scaledWidth, scaledHeight);
  }

  private getMousePos(canvas: HTMLCanvasElement, event: MouseEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
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

  private onMouseDown(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const mousePos = this.getMousePos(canvas, event);

    this.isDragging = true;
    this.lastX = mousePos.x;
    this.lastY = mousePos.y;

    canvas.style.cursor = 'grabbing';
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const canvas = this.canvasRef.nativeElement;
    const mousePos = this.getMousePos(canvas, event);

    const dx = mousePos.x - this.lastX;
    const dy = mousePos.y - this.lastY;

    this.offsetX += dx;
    this.offsetY += dy;

    this.lastX = mousePos.x;
    this.lastY = mousePos.y;

    this.draw();
  }

  private onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isDragging) return;

    this.isDragging = false;

    const canvas = this.canvasRef.nativeElement;
    canvas.style.cursor = 'grab';
  }
}
