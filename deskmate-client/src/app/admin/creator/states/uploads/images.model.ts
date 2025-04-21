import { EntityState } from '@datorama/akita';

export interface ImagesState extends EntityState<Image, string> {}

export interface Image {
  id: string;
  file: File;
  url: string;
}
