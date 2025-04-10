import { Component, OnInit } from '@angular/core';
import { GetAllResponse } from '../../interfaces/get-all-response';
import { VmsService } from '../../services/vms.service';
import { Router } from '@angular/router';
import { GenericResponse } from '../../interfaces/generic-response';
import { createAlert } from '../../../shared/utils/alert';
import { isLoggedIn } from '../../../shared/utils/auth-util';
import { errorHandler } from '../../../shared/utils/exceptions-util';

@Component({
  selector: 'app-get-all-page',
  templateUrl: './get-all-page.component.html',
  styles: ``
})
export class GetAllPageComponent implements OnInit {

  constructor(private vmsService: VmsService, private router: Router) { }
  vms: GetAllResponse[] = [];

  ngOnInit(): void {
    this.getAll();

    if(!isLoggedIn()){
      this.router.navigate(['/auth/login']);
    }
  }

  getAll(): void{
    this.vmsService.getAll().subscribe({
      next: (data) => {
        let dataResponse: GenericResponse<GetAllResponse[]> = data as GenericResponse<GetAllResponse[]>;
        if (dataResponse.data !== null && dataResponse.data !== undefined) {
          this.vms = dataResponse.data;
        } else {
          createAlert('error', 'Ocurrió un error al eliminar la maquina virtual', dataResponse.message)
        }
      },
      error: (error) => {
        errorHandler(error, this.router);
      },
    });
  }
}
