import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAdministrator, isLoggedIn } from '../../../shared/utils/auth-util';

@Component({
  selector: 'vms-home-page',
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
    if(!isLoggedIn()){
      this.router.navigate(['/auth/login']);
    }
  }

  isAdministrator(): boolean {
    return isAdministrator();
  }

  closeSession(): void {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
