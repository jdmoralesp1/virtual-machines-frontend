import { Component, ElementRef, ViewChild } from '@angular/core';
import { VmsService } from './vms/services/vms.service';
import { Login } from './vms/interfaces/login';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PruebaTecnica';


}
