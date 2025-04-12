import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLayoutCreatorComponent } from './office-layout-creator.component';

describe('OfficeLayoutCreatorComponent', () => {
  let component: OfficeLayoutCreatorComponent;
  let fixture: ComponentFixture<OfficeLayoutCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeLayoutCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficeLayoutCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
