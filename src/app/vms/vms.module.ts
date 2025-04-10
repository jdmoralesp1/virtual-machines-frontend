import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmsRoutingModule } from './vms-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthModule } from '../auth/auth.module';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { GetByIdPageComponent } from './pages/get-by-id-page/get-by-id-page.component';
import { GetAllPageComponent } from './pages/get-all-page/get-all-page.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { TableListComponent } from './components/table-list/table-list.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CreatePageComponent,
    UpdatePageComponent,
    DeletePageComponent,
    GetByIdPageComponent,
    GetAllPageComponent,
    TableComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
    VmsRoutingModule,
    AuthModule,
    FormsModule
  ]
})
export class VmsModule { }
