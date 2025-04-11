import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetAllResponse } from '../../interfaces/get-all-response';

@Component({
  selector: 'vms-table-list',
  templateUrl: './table-list.component.html',
  styles: ``
})
export class TableListComponent implements OnInit {
  ngOnInit(): void {
    this.vms = [];
  }

  @Input()
  vms: GetAllResponse[] = [];

}
