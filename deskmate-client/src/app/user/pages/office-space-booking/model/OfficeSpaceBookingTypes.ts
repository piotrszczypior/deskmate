import {Image} from '../../../../admin/creator/states/uploads/images.model';
import {Point} from '../../../../admin/components/canvas-with-markings/canvas-with-markings.component';


export interface Building {
  id: number;
  name: string;
}

export interface FloorImage {
  id: number;
  floorNumber: number;
  image: Image;
}

export interface Desk {
  id: number;
  point: Point;
  isAvailable: boolean
}