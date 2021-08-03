import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './index/main/main.component';
import { OrdenComponent } from './orden/orden.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: ()=> import('./index/index.module').then(m => m.IndexModule),
  },
  {
    path:'orden-produccion/:id',
    component:OrdenComponent
  },
  {
    path: 'orden',
    loadChildren: ()=> import('./nuevo-pedido/nuevo-pedido.module').then(m => m.NuevoPedidoModule)
  },
  {
    path: 'gestiones',
    loadChildren: ()=> import('./producto-ymaquinaria/producto-ymaquinaria.module').then(m=> m.ProductoYMaquinariaModule)
  },
  {
    path: 'almacen',
    loadChildren: ()=> import('./almacen/almacen.module').then(m=>m.AlmacenModule)
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
