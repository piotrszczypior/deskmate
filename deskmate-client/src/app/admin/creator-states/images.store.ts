import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ImagesState } from './images.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'images', idKey: 'id' })
export class ImagesStore extends EntityStore<ImagesState> {
  constructor() {
    super();
  }
}
