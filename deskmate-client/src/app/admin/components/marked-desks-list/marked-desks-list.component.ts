import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Point } from '../canvas-with-markings/canvas-with-markings.component';

@Component({
  selector: 'app-marked-desks-list',
  imports: [],
  templateUrl: './marked-desks-list.component.html',
  styleUrl: './marked-desks-list.component.scss',
})
export class MarkedDesksListComponent implements OnChanges {
  //TODO CSS to be rewritten

  @Input() marks: Point[] = [];

  @Output()
  selectedDesk = new EventEmitter<Point>();

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDesk.emit();
  }

  removeLocation(index: number): void {
    this.notifyMarkChange();
  }

  clearAllLocations(): void {
    this.notifyMarkChange();
  }

  saveLocations(): void {}

  onSelect(index: number) {
    this.selectedDesk.emit(this.marks[index]);
  }

  private notifyMarkChange(): void {}
}
