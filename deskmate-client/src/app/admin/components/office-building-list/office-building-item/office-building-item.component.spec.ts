import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBuildingItemComponent } from './office-building-item.component';

describe('OfficeBuildingItemComponent', () => {
  let component: OfficeBuildingItemComponent;
  let fixture: ComponentFixture<OfficeBuildingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeBuildingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeBuildingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
