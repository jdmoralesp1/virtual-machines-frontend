import { Component, OnInit } from '@angular/core';
import { VmsService } from '../../services/vms.service';
import { Router } from '@angular/router';
import { GenericResponse } from '../../interfaces/generic-response';
import { createAlert } from '../../../shared/utils/alert';
import { isAdministrator, isLoggedIn } from '../../../shared/utils/auth-util';
import { errorHandler } from '../../../shared/utils/exceptions-util';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styles: ``
})
export class DeletePageComponent implements OnInit {
  ngOnInit(): void {
    if (!isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    }

    if (!isAdministrator()) {
      this.router.navigate(['/vms']);
    }
  }

  constructor(private vmsService: VmsService, private router: Router) { }

  idVm: number | null = null;

  deleteById(): void {
    this.vmsService.deleteById(this.idVm!).subscribe({
      next: (data) => {
        let dataResponse: GenericResponse<string> = data as GenericResponse<string>;
        if (dataResponse.data !== null && dataResponse.data !== undefined) {
          createAlert('success', 'Maquina Virtual Eliminada Correctamente', dataResponse.data,)
          this.idVm = null;
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
