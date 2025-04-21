import { Component, Input } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'app-floor-item',
  imports: [DividerComponent],
  templateUrl: './floor-item.component.html',
  styleUrl: './floor-item.component.scss',
})
export class FloorItemComponent {
  @Input({ required: true })
  floorNumber: number;
}
