import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VmsService } from '../../services/vms.service';
import { Router } from '@angular/router';
import { OperatingSystems } from '../../enums/operating-systems';
import { GenericResponse } from '../../interfaces/generic-response';
import { GetByIdResponse } from '../../interfaces/get-by-id-response';
import { createAlert } from '../../../shared/utils/alert';
import { UpdateVM } from '../../interfaces/update';
import { isAdministrator, isLoggedIn } from '../../../shared/utils/auth-util';
import { errorHandler } from '../../../shared/utils/exceptions-util';
import { SignalRService } from '../../../shared/services/signalr.service';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styles: ``
})
export class UpdatePageComponent implements OnInit {

  ngOnInit(): void {
    if(!isLoggedIn()){
      this.router.navigate(['/auth/login']);
    }

    if(!isAdministrator()){
      this.router.navigate(['/vms']);
    }

    this.signalRService.virtualMachine$.subscribe(vm => {
      if (vm) {
        if(vm.id === this.idVm){
          console.log({vm});
          this.cores = vm.cores;
          this.ram = vm.ram;
          this.disc = vm.disc;
          this.selectedOS = OperatingSystems[vm.operatingSystem as keyof typeof OperatingSystems];
          this.idVm = vm.id;
        }
      }
    });
  }

  constructor(private vmsService: VmsService, private router: Router, private signalRService: SignalRService) { }

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
  idVm: number | null = null;

  isDisabledInputs: boolean = true;

  searchById(): void {
    this.resetForm(false);
    this.vmsService.getById(this.idVm!).subscribe({
      next: (data) => {
        let dataResponse: GenericResponse<GetByIdResponse> = data as GenericResponse<GetByIdResponse>;
        if (dataResponse.data !== null && dataResponse.data !== undefined) {
          this.cores = dataResponse.data.cores;
          this.ram = dataResponse.data.ram;
          this.disc = dataResponse.data.disc;
          this.selectedOS = OperatingSystems[dataResponse.data.operatingSystem as keyof typeof OperatingSystems];
          this.idVm = dataResponse.data.id;
          this.isDisabledInputs = false;
        } else {
          createAlert('error', 'Ocurrió un error al obtener la maquina virtual', dataResponse.message)
        }
      },
      error: (error) => {
        errorHandler(error, this.router);
      },
    });
  }

  update(): void {
    const vm: UpdateVM = {
      operatingSystem: Number(this.selectedOS),
      cores: this.cores,
      ram: this.ram,
      disc: this.disc,
    };

    this.vmsService.update(vm, this.idVm!).subscribe({
      next: (data) => {
        let dataResponse: GenericResponse<string> = data as GenericResponse<string>;
        if (dataResponse.data !== null && dataResponse.data !== undefined) {
          createAlert('success', 'Maquina Virtual Actualizada Correctamente', dataResponse.data,)
          this.resetForm(true);
        } else {
          createAlert('error', 'Ocurrió un error al actualizar la maquina virtual', dataResponse.message)
        }
      },
      error: (error) => {
        errorHandler(error, this.router);
      }
    });
  }

  resetForm(resetVm: boolean): void {
    this.selectedOS = this.operatingSystems[0].value;
    this.cores = null;
    this.ram = null;
    this.disc = null;
    this.isDisabledInputs = true;
    this.idVm = resetVm ? null : this.idVm;
  }

}
