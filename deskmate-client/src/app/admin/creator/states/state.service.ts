import { Injectable } from '@angular/core';
import { CurrentState, States } from './state.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImagesQuery } from './uploads/images.query';

@Injectable({ providedIn: 'root' })
export class StateService {
  private readonly currentState$ = new BehaviorSubject<CurrentState>({ state: States.UPLOAD_STATE });

  constructor(private readonly imagesQuery: ImagesQuery) {}

  getCurrentState$(): Observable<CurrentState> {
    return this.currentState$.asObservable();
  }

  transitionToNextState() {
    const currentState = this.currentState$.getValue();

    switch (currentState.state) {
      case States.UPLOAD_STATE: {
        if (this.canTransitFromUploadState()) {
          this.currentState$.next({ state: States.ANNOTATION_STATE });
        }
        break;
      }
      case States.ANNOTATION_STATE: {
        this.currentState$.next({ state: States.SUMMARY_STATE });
        break;
      }
    }
  }

  transitionToPreviousState(): void {
    const currentState = this.currentState$.getValue();

    switch (currentState.state) {
      case States.ANNOTATION_STATE:
        this.currentState$.next({ state: States.UPLOAD_STATE });
        break;

      case States.SUMMARY_STATE:
        this.currentState$.next({ state: States.ANNOTATION_STATE });
        break;
    }
  }

  private canTransitFromUploadState(): boolean {
    // TODO: write own query or use select with async and firstElementOf
    return this.imagesQuery.getAll().length > 0;
  }
}
