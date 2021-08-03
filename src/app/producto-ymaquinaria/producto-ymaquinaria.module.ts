import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ProductoYMaquinariaRoutingModule } from './producto-ymaquinaria-routing.module';
import { RouterModule, Router } from '@angular/router';
import { MaquinariaComponent } from './maquinaria/maquinaria.component';
import { ProductosComponent } from './productos/productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [MainComponent, MaquinariaComponent, ProductosComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductoYMaquinariaRoutingModule
  ]
})
export class ProductoYMaquinariaModule { }
