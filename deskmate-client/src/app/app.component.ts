import { Component } from '@angular/core';
import { OfficeLayoutCreatorComponent } from './creator/office-layout-creator/office-layout-creator.component';

@Component({
  selector: 'app-root',
  imports: [OfficeLayoutCreatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'deskmate-client';
}
