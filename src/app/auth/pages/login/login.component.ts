import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VmsService } from '../../../vms/services/vms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../../vms/interfaces/login';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  constructor(private vmsService: VmsService, private router: Router) { }
  ngOnInit(): void {
    if(sessionStorage.getItem('authToken') !== null){
      this.router.navigate(['/vms']);
    }
  }

  login(user: string, password: string): void {
    const login: Login = { username: user, password: password };

    this.vmsService.login(login).subscribe({
      next: (data) => {
        this.vmsService.setVariables(data.token);
        this.router.navigate(['/vms']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
        });
      }
    });
  }
}
