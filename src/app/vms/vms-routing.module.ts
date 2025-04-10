import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { GetByIdPageComponent } from './pages/get-by-id-page/get-by-id-page.component';
import { GetAllPageComponent } from './pages/get-all-page/get-all-page.component';

const routes: Routes =[
  {
    path: '', // Esto es importante para rutas hijas
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'create',
        component: CreatePageComponent
      },
      {
        path: 'update',
        component: UpdatePageComponent
      },
      {
        path: 'delete',
        component: DeletePageComponent
      },
      {
        path: 'get-by-id',
        component: GetByIdPageComponent
      },
      {
        path: 'get-all',
        component: GetAllPageComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class VmsRoutingModule { }
