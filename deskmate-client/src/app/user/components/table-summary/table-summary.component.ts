import {Component, Input} from '@angular/core';
import {KeyValuePipe} from '@angular/common';


@Component({
  selector: 'app-table-summary',
  imports: [
    KeyValuePipe
  ],
  templateUrl: './table-summary.component.html',
  styleUrl: './table-summary.component.scss'
})
export class TableSummaryComponent {
  @Input({required: true})
  data: { [key: string]: string }
  @Input({required: true})
  title: string;
  noSort = () => 0;
}
