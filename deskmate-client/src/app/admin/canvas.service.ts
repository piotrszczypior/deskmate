import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private readonly ADDITIONAL_PADDING = 20;

  constructor() {}

  calculateImageInCenterOfCanvas(canvasWidth: number, canvasHeight: number, image: HTMLImageElement): CanvasConfig {
    let scale = 1.0;

    const availableWidth = canvasWidth - this.ADDITIONAL_PADDING * 2;
    const availableHeight = canvasHeight - this.ADDITIONAL_PADDING * 2;

    const canvasAspectRatio = availableWidth / availableHeight;
    const imageAspectRatio = image.width / image.height;

    if (imageAspectRatio > canvasAspectRatio) {
      scale = availableWidth / image.width;
    } else {
      scale = availableHeight / image.height;
    }

    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;
    const offsets = this.calculateCenterOffsets(canvasWidth, canvasHeight, scaledWidth, scaledHeight);

    return {
      scale: scale,
      scaledWidth: scaledWidth,
      scaledHeight: scaledHeight,
      imgOffsetX: offsets.offsetX,
      imgOffsetY: offsets.offsetY,
    };
  }

  private calculateCenterOffsets(
    canvasWidth: number,
    canvasHeight: number,
    scaledWidth: number,
    scaledHeight: number
  ): { offsetX: number; offsetY: number } {
    const offsetX = (canvasWidth - scaledWidth) / 2;
    const offsetY = (canvasHeight - scaledHeight) / 2;

    return { offsetX: offsetX, offsetY: offsetY };
  }
}

export interface CanvasConfig {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
  imgOffsetX: number;
  imgOffsetY: number;
}
