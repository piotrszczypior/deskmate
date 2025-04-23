import { QueryEntity } from '@datorama/akita';
import { Image, ImagesState } from './images.model';
import { Injectable } from '@angular/core';
import { ImagesStore } from './images.store';
import { Observable } from 'rxjs';
import { Point } from '../../../components/canvas-with-markings/canvas-with-markings.component';

@Injectable({ providedIn: 'root' })
export class ImagesQuery extends QueryEntity<ImagesState, Image> {
  constructor(protected readonly store: ImagesStore) {
    super(store);
  }

  getMarksByImageId(id: string) {
    return this.getEntity(id)?.marks;
  }

  selectMarksByImageId(id: string): Observable<Point[]> {
    return this.selectEntity(id, (entity) => entity?.marks!);
  }
}
