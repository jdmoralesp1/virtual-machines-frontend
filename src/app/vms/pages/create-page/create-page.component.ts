import { Component, OnInit } from '@angular/core';
import { OperatingSystems } from '../../enums/operating-systems';
import { VmsService } from '../../services/vms.service';
import { Router } from '@angular/router';
import { CreateResponse } from '../../interfaces/create-reponse';
import { GenericResponse } from '../../interfaces/generic-response';
import { createAlert } from '../../../shared/utils/alert';
import { CreateVM } from '../../interfaces/create';
import { isAdministrator, isLoggedIn } from '../../../shared/utils/auth-util';
import { errorHandler } from '../../../shared/utils/exceptions-util';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styles: ``
})
export class CreatePageComponent implements OnInit {

  constructor(private vmsService: VmsService, private router: Router) { }
  ngOnInit(): void {
    if(!isLoggedIn()){
      this.router.navigate(['/auth/login']);
    }

    if(!isAdministrator()){
      this.router.navigate(['/vms']);
    }
  }

  operatingSystems = Object.keys(OperatingSystems)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: OperatingSystems[key as keyof typeof OperatingSystems],
    }));

  selectedOS: OperatingSystems = this.operatingSystems[0].value;
  cores: number | null = null;
  ram: number | null = null;
  disc: number | null = null;

  create() {
    const vm: CreateVM = {
      operatingSystem: Number(this.selectedOS),
      cores: this.cores,
      ram: this.ram,
      disc: this.disc,
    };

    this.vmsService.create(vm).subscribe({
      next: (data) => {
        let dataResponse: GenericResponse<CreateResponse> = data as GenericResponse<CreateResponse>;
        if(dataResponse.data !== null && dataResponse.data !== undefined){
          createAlert('success', 'Maquina Virtual Creada Correctamente', `Se ha creado la máquina virtual con ID: ${dataResponse.data.id}`,)
          this.resetForm();
        }else{
          createAlert('error', 'Ocurrió un error al crear la maquina virtual', dataResponse.message)
        }
      },
      error: (error) => {
        errorHandler(error, this.router);
      },
    });
  }

  resetForm(): void {
    this.selectedOS = this.operatingSystems[0].value;
    this.cores = null;
    this.ram = null;
    this.disc = null;
  }
}
