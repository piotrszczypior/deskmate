export interface CurrentState {
  state: States;
}

export enum States {
  UPLOAD_STATE = 'UPLOAD_STATE',
  ANNOTATION_STATE = 'ANNOTATION_STATE',
  SUMMARY_STATE = 'SUBMITTED_STATE',
}
