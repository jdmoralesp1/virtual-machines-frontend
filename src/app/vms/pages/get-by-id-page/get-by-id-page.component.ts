import { Component, OnInit } from '@angular/core';
import { VmsService } from '../../services/vms.service';
import { Router } from '@angular/router';
import { GenericResponse } from '../../interfaces/generic-response';
import { createAlert } from '../../../shared/utils/alert';
import { GetByIdResponse } from '../../interfaces/get-by-id-response';
import { isLoggedIn } from '../../../shared/utils/auth-util';

@Component({
  selector: 'app-get-by-id-page',
  templateUrl: './get-by-id-page.component.html',
  styles: ``
})
export class GetByIdPageComponent implements OnInit {

  ngOnInit(): void {
    if(!isLoggedIn()){
      this.router.navigate(['/auth/login']);
    }
  }

  constructor(private vmsService: VmsService, private router: Router) { }

  idVm: number | null = null;
  vm: GetByIdResponse | null = null;

  searchById(): void {
    this.vmsService.getById(this.idVm!).subscribe({
      next: (data) => {
        let dataResponse: GenericResponse<GetByIdResponse> = data as GenericResponse<GetByIdResponse>;
        if (dataResponse.data !== null && dataResponse.data !== undefined) {
          this.vm = dataResponse.data;
        } else {
          createAlert('error', 'Ocurrió un error al obtener la maquina virtual', dataResponse.message)
        }
      },
      error: (error) => {
        cerrorHandler(error, this.router);
      },
    });
  }

  resetForm(): void {
    this.idVm = null;
    this.vm = null;
  }
}
function cerrorHandler(error: any, router: Router) {
  throw new Error('Function not implemented.');
}

