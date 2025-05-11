import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CanvasPoint, ImageCanvasComponent} from '../../../admin/components/image-canvas/image-canvas.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {arePointsEqual, Point} from '../../../admin/components/canvas-with-markings/canvas-with-markings.component';
import {Desk, FloorImage} from '../../pages/office-space-booking/model/OfficeSpaceBookingTypes';


@Component({
  selector: 'app-place-picker',
  imports: [
    ImageCanvasComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PlacePickerComponent),
    }],
  templateUrl: './place-picker.component.html',
  styleUrl: './place-picker.component.scss'
})
export class PlacePickerComponent implements ControlValueAccessor, OnChanges {
  @Input({required: true})
  floorImage: FloorImage | undefined;
  @Input({required: true})
  desks: Desk[];
  
  selectedPlace: Desk | null;
  touched: boolean = false;

  private onChange = (_: Desk | null) => {
  };
  private onTouched = () => {
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['floorImage']) {
      this.selectedPlace = null;
      this.onChange(this.selectedPlace);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(selectedPlace: Desk): void {
    this.selectedPlace = selectedPlace;
  }

  placeSelected(desk: Point) {
    const selectedDesk: Desk | undefined = this.desks?.find(d => d.isAvailable && arePointsEqual(
        d.point,
        desk))
    if (selectedDesk) {
      this.selectedPlace = selectedDesk;
      this.onChange(this.selectedPlace);
    }
    this.markAsTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  mapPointsToCanvasPoints(): CanvasPoint[] {
    const availablePoints: CanvasPoint[] = this.desks?.filter(p => !p.isAvailable)
                                               .map(p => <CanvasPoint>{point: p.point, color: 'red'}) ?? [];

    const unavailablePoints: CanvasPoint[] = this.desks?.filter(p => p.isAvailable)
                                                 .map(p => <CanvasPoint>{point: p.point, color: 'green'}) ?? [];
    return [
      ...availablePoints,
      ...unavailablePoints,
      ...(this.selectedPlace ? [<CanvasPoint>{point: this.selectedPlace.point, color: 'yellow'}] : [])
    ];
  }
}
