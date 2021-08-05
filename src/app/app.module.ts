import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './index/main/main.component';
import { SharedModule } from './shared/shared.module';
import { IndexModule } from './index/index.module';
import { AppRoutingModule } from './app-routing.module';
import { NuevoPedidoComponent } from './nuevo-pedido/nuevo-pedido.component';
import { NuevoPedidoModule } from './nuevo-pedido/nuevo-pedido.module';
import { RouterModule } from '@angular/router';
import { ProductoYMaquinariaComponent } from './producto-ymaquinaria/producto-ymaquinaria.component';
import { ProductoYMaquinariaModule } from './producto-ymaquinaria/producto-ymaquinaria.module';
import { AlmacenComponent } from './almacen/almacen.component';
import { AlmacenModule } from './almacen/almacen.module';
import { OrdenComponent } from './orden/orden.component';
import { OrdenesModule } from './ordenes/ordenes.module';
import { OrdenesComponent } from './ordenes/ordenes.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MainComponent,
    NuevoPedidoComponent,
    ProductoYMaquinariaComponent,
    AlmacenComponent,
    OrdenComponent,
    OrdenesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
    IndexModule,
    NuevoPedidoModule,
    ProductoYMaquinariaModule,
    AlmacenModule,
    OrdenesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
