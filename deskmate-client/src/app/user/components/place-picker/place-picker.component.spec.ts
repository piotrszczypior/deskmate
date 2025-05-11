import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePickerComponent } from './place-picker.component';

describe('PlacePickerComponent', () => {
  let component: PlacePickerComponent;
  let fixture: ComponentFixture<PlacePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
