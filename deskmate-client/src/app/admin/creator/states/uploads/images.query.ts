import { QueryEntity } from '@datorama/akita';
import { Image, ImagesState } from './images.model';
import { Injectable } from '@angular/core';
import { ImagesStore } from './images.store';

@Injectable({ providedIn: 'root' })
export class ImagesQuery extends QueryEntity<ImagesState, Image> {
  constructor(protected readonly store: ImagesStore) {
    super(store);
  }
}
