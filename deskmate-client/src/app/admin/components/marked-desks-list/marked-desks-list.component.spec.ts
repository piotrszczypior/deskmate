import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedDesksListComponent } from './marked-desks-list.component';

describe('MarkedDesksListComponent', () => {
  let component: MarkedDesksListComponent;
  let fixture: ComponentFixture<MarkedDesksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkedDesksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkedDesksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
