import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesComponent } from './ordenes.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrdenComponent } from '../orden/orden.component';


const routes: Routes =[
  {
    path:'',
    component:OrdenesComponent,
    children:[
      {
        path:'',
        component:MainComponent
      }]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdenesRoutingModule { }
