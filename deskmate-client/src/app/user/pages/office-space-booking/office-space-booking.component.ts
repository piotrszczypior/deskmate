import {Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {DateBuildingStepComponent} from './date-building-step/date-building-step.component';
import {PlaceBookingStepComponent} from './place-booking-step/place-booking-step.component';
import {
  CreatorNavigationButtonsGruopComponent
} from '../../../admin/components/creator-navigation-buttons-gruop/creator-navigation-buttons-gruop.component';
import {TableSummaryComponent} from '../../components/table-summary/table-summary.component';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../info-dialog/info-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Building, Desk, FloorImage} from './model/OfficeSpaceBookingTypes';
import {getDateFromDate, getTimeFromDate} from '../../../shared/utils/DateUtils';
import {BookingsService} from '../my-bookings/service/bookings.service';
import {forkJoin, Observable} from 'rxjs';
import {OfficeSpaceService} from './service/office-space.service';
import {Booking} from '../my-bookings/model/BookingTypes';
import {map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-office-space-booking',
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    FormsModule,
    PlaceBookingStepComponent,
    DateBuildingStepComponent,
    CreatorNavigationButtonsGruopComponent,
    TableSummaryComponent
  ],
  providers: [
    MatDatepickerModule,
  ],
  templateUrl: './office-space-booking.component.html',
  styleUrl: './office-space-booking.component.scss'
})
export class OfficeSpaceBookingComponent implements OnInit {
  protected formGroup: FormGroup;
  private isEdititingForm: boolean;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly dialog: MatDialog,
      private readonly router: Router,
      private readonly route: ActivatedRoute,
      private readonly bookingService: BookingsService,
      private readonly officeSpaceService: OfficeSpaceService
  ) {
  }

  get dateBuildingFormGroup(): FormGroup {
    return <FormGroup>this.formGroup.get('dateBuilding');
  }

  get placeFormGroup(): FormGroup {
    return <FormGroup>this.formGroup.get('place');
  }

  get startDate(): Date | null {
    return this.dateBuildingFormGroup.get('startDate')?.value;
  }

  get endDate(): Date | null {
    return this.dateBuildingFormGroup.get('endDate')?.value;
  }

  get startTime(): Date | null {
    return this.dateBuildingFormGroup.get('startTime')?.value;
  }

  get endTime(): Date | null {
    return this.dateBuildingFormGroup.get('endTime')?.value;
  }

  get building(): Building | null {
    return this.dateBuildingFormGroup.get('building')?.value;
  }

  get floor(): FloorImage | null {
    return this.placeFormGroup.get('floor')?.value;
  }

  get desk(): Desk | null {
    return this.placeFormGroup.get('desk')?.value;
  }

  ngOnInit(): void {
    const bookingId: string | null = this.route.snapshot.paramMap.get('id');
    this.isEdititingForm = !!bookingId;

    this.formGroup = this.formBuilder.group({
      dateBuilding: this.formBuilder.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        building: [null, Validators.required]
      }, {
        validators: this.timeRangeValidator('startTime', 'endTime')
      }),
      place: this.formBuilder.group({
        floor: [null, Validators.required],
        desk: [null, Validators.required]
      })
    });

    if (bookingId) {
      this.resolveRouteData(+bookingId).subscribe({
        next: ({booking, floorImages, desks}) => {
          this.formGroup.patchValue({
            dateBuilding: {
              startDate: booking.startDate,
              endDate: booking.endDate,
              startTime: booking.startDate,
              endTime: booking.endDate,
              building: booking.building
            },
            place: {
              floor: floorImages.find((fi: FloorImage) => fi.id === booking.floorImageId),
              desk: desks.find((d: Desk) => d.id === booking.deskId)
            }
          });
          console.log(booking)
        },
        error: () => void this.router.navigate(['']) //TODO: WE CAN MOVE IT TO GUARD BUT WHO CARES
      });
    }
  }


  onSubmit(): void {
    if (!this.isEdititingForm) {
      //TODO: POST
      void this.router.navigate([''])
      this.dialog.open(InfoDialogComponent, {data: 'Your booking has been successfully created!'})
    } else {
      //TODO: PUT
      void this.router.navigate([''])
      this.dialog.open(InfoDialogComponent, {data: 'Your booking has been successfully updated!'})
    }
  }

  getSummaryData(): { [key: string]: string } {
    return {
      'Start Date': this.startDate ? getDateFromDate(this.startDate) : '',
      'End Date': this.endDate ? getDateFromDate(this.endDate) : '',
      'Start Time': this.startTime ? getTimeFromDate(this.startTime) : '',
      'End Time': this.endTime ? getTimeFromDate(this.endTime) : '',
      'Building': this.building?.name ?? '',
      'Floor': this.floor?.floorNumber.toString() ?? '',
      'Desk': this.desk?.id.toString() ?? ''
    }
  }

  private timeRangeValidator(
      startTimeKey: string,
      endTimeKey: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const startControl: AbstractControl = group.get(startTimeKey)!;
      const endControl: AbstractControl = group.get(endTimeKey)!;

      if (startControl.value === null || endControl.value === null) {
        return null;
      }

      const error = endControl.value.getTime() > startControl.value.getTime() ? null : {invalidTime: true};

      startControl.setErrors(error)
      endControl.setErrors(error)

      return error;
    };
  }

  private resolveRouteData(bookingId: number): Observable<({
    booking: Booking,
    floorImages: FloorImage[],
    desks: Desk[]
  })> {
    return this.bookingService.getBookingById(bookingId).pipe(
        switchMap(booking =>
            forkJoin({
              floorImages: this.officeSpaceService.getFloorImagesByBuilding(booking.building.id),
              desks: this.officeSpaceService.getDesksByFloorAndDate(
                  booking.floorImageId, booking.startDate, booking.endDate)
            }).pipe(map(({floorImages, desks}) => ({booking, floorImages, desks})))));
  }
}