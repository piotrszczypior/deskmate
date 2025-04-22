import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorNavigationButtonsGruopComponent } from './creator-navigation-buttons-gruop.component';

describe('CreatorNavigationButtonsGruopComponent', () => {
  let component: CreatorNavigationButtonsGruopComponent;
  let fixture: ComponentFixture<CreatorNavigationButtonsGruopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorNavigationButtonsGruopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorNavigationButtonsGruopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
