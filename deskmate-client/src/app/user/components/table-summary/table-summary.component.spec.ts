import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSummaryComponent } from './table-summary.component';

describe('TableSummaryComponent', () => {
  let component: TableSummaryComponent;
  let fixture: ComponentFixture<TableSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
