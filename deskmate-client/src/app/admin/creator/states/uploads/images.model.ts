import { EntityState } from '@datorama/akita';
import { Point } from '../../../components/canvas-with-markings/canvas-with-markings.component';

export interface ImagesState extends EntityState<Image, string> {}

export interface Image {
  id: string;
  file: File;
  url: string;
  marks?: Point[];
}
