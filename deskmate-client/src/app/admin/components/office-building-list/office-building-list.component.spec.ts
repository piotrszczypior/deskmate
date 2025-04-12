import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBuildingListComponent } from './office-building-list.component';

describe('OfficeBuildingListComponent', () => {
  let component: OfficeBuildingListComponent;
  let fixture: ComponentFixture<OfficeBuildingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeBuildingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeBuildingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
