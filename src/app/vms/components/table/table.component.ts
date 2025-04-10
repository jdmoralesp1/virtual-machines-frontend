import { Component, Input } from '@angular/core';
import { GetByIdResponse } from '../../interfaces/get-by-id-response';

@Component({
  selector: 'vms-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  @Input()
  vm!: GetByIdResponse;
}
