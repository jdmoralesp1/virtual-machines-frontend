import { Component, Input } from '@angular/core';
import { GetAllResponse } from '../../interfaces/get-all-response';

@Component({
  selector: 'vms-table-list',
  templateUrl: './table-list.component.html',
  styles: ``
})
export class TableListComponent {
  @Input()
  vms: GetAllResponse[] = [];
}
