import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingAnnotatorComponent } from './seating-annotator.component';

describe('SeatingAnnotatorComponent', () => {
  let component: SeatingAnnotatorComponent;
  let fixture: ComponentFixture<SeatingAnnotatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatingAnnotatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatingAnnotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
