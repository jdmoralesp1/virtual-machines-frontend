import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { GetAllResponse } from '../../vms/interfaces/get-all-response';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private virtualMachineSubject = new BehaviorSubject<GetAllResponse | null>(null);
  public virtualMachine$ = this.virtualMachineSubject.asObservable();

  constructor() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/virtualMachineHub`)
      .build();

    this.hubConnection.on('ReceiveVirtualMachineUpdate', (virtualMachine: GetAllResponse) => {
      this.virtualMachineSubject.next(virtualMachine);
    });

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }
}
