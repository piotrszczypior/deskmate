import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-info-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatIcon],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
