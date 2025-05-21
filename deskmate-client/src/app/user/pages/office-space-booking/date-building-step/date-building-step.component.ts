import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatDivider} from '@angular/material/divider';
import {OfficeSpaceService} from '../service/office-space.service';
import {Building} from '../model/OfficeSpaceBookingTypes';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {compareById} from '../../../../shared/utils/FormUtils';


@Component({
  selector: 'app-date-building-step',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatTimepicker,
    MatTimepickerInput,
    MatTimepickerToggle,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatDivider,
    MatHint
  ],
  templateUrl: './date-building-step.component.html',
  styleUrl: './date-building-step.component.scss'
})
export class DateBuildingStepComponent implements OnInit {
  @Input({required: true})
  formGroup: FormGroup;
  availableBuildings: Building[];

  constructor(private readonly officeSpaceService: OfficeSpaceService) {
  }

  ngOnInit(): void {
    this.officeSpaceService.getAvailableBuildings().subscribe({
      next: value => this.availableBuildings = value
    });
  }

  protected readonly compareById = compareById;
}
