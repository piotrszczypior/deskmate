import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-creator-navigation-buttons-gruop',
  imports: [IconComponent],
  templateUrl: './creator-navigation-buttons-gruop.component.html',
  styleUrl: './creator-navigation-buttons-gruop.component.scss',
})
export class CreatorNavigationButtonsGruopComponent {
  @Output()
  onContinueClick = new EventEmitter<void>();

  @Output()
  onBackClick = new EventEmitter<void>();

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.onBackClick.emit();
  }

  continueClicked($event: MouseEvent) {
    $event.preventDefault();
    this.onContinueClick.emit();
  }
}
