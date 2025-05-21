import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OfficeSpaceService} from '../service/office-space.service';
import {PlacePickerComponent} from '../../../components/place-picker/place-picker.component';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {MatFormField, MatLabel} from '@angular/material/input';
import {Building, Desk, FloorImage} from '../model/OfficeSpaceBookingTypes';
import {compareById} from '../../../../shared/utils/FormUtils';


@Component({
  selector: 'app-place-booking-step',
  imports: [
    ReactiveFormsModule,
    PlacePickerComponent,
    MatOption,
    MatSelect,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './place-booking-step.component.html',
  styleUrl: './place-booking-step.component.scss'
})
export class PlaceBookingStepComponent implements OnInit, OnChanges {
  @Input({required: true})
  formGroup: FormGroup;
  @Input({required: true})
  building: Building;
  @Input({required: true})
  startDate: Date;
  @Input({required: true})
  endDate: Date

  availableDesks: Desk[] = [];
  floorImages: FloorImage[] = [];

  constructor(private readonly officeSpaceService: OfficeSpaceService) {
  }

  ngOnInit(): void {
    const floorId: number = this.formGroup.get('floor')?.value;
    if (floorId) {
      this.updateAvailableDesks(floorId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['building']) {
      this.officeSpaceService.getFloorImagesByBuilding(this.building.id).subscribe({
        next: value => this.floorImages = value
      })
    }
  }

  onSelectionChange(event: MatSelectChange): void {
    this.updateAvailableDesks(event.value);
  }

  private updateAvailableDesks(floorId: number): void {
    this.officeSpaceService.getDesksByFloorAndDate(floorId, this.startDate, this.endDate).subscribe({
      next: val => this.availableDesks = val
    });
  }

  protected readonly compareById = compareById;
}
