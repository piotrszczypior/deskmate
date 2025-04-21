import { Injectable } from '@angular/core';
import { ImagesStore } from './images.store';
import { ImagesQuery } from './images.query';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  constructor(
    private readonly store: ImagesStore,
    private readonly query: ImagesQuery
  ) {}

  storeFile(files: File[]): void {
    // TODO this array from
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = {
          id: file.name,
          file: file,
          url: e.target?.result as string,
        };
        console.log(image);

        this.store.add(image);
      };

      reader.readAsDataURL(files[0]);
    });
  }

  deleteFile(filename: string): void {
    this.store.remove(filename);
  }

  reorderFiles(previousIndex: number, currentIndex: number) {
    const images = [...this.query.getAll()];

    moveItemInArray(images, previousIndex, currentIndex);
    // const [moved] = images.splice(previousIndex, 1);
    // images.splice(currentIndex, 0, moved);

    this.store.set(images);
  }
}
