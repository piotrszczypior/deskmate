import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { CurrentState, States } from '../../creator/states/state.model';
import { UploadWithPreviewComponent } from '../../creator/components/upload-with-preview/upload-with-preview.component';
import { StateService } from '../../creator/states/state.service';
import { Router } from '@angular/router';
import { SeatingAnnotatorComponent } from '../../creator/components/seating-annotator/seating-annotator.component';

@Component({
  selector: 'app-office-layout-creator',
  imports: [AsyncPipe, NgIf, UploadWithPreviewComponent, SeatingAnnotatorComponent],
  templateUrl: './office-layout-creator.component.html',
})
export class OfficeLayoutCreatorComponent {
  protected readonly States = States;

  constructor(
    private readonly stateService: StateService,
    private readonly router: Router
  ) {}

  get currentState$(): Observable<CurrentState> {
    return this.stateService.getCurrentState$();
  }

  onExit(): void {
    void this.router.navigateByUrl('admin-dashboard');
  }

  onNextState(): void {
    this.stateService.transitionToNextState();
  }

  onPreviousState(): void {
    this.stateService.transitionToPreviousState();
  }
}
