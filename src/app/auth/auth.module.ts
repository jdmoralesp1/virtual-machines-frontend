import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    RouterModule
  ],
  exports: [
    LoginComponent,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthModule { }
