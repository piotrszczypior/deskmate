import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWithMarkingsComponent } from './canvas-with-markings.component';

describe('CanvasWithMarkingsComponent', () => {
  let component: CanvasWithMarkingsComponent;
  let fixture: ComponentFixture<CanvasWithMarkingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasWithMarkingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasWithMarkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
