import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NuevoPedidoRoutingModule } from './nuevo-pedido-routing.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    NuevoPedidoRoutingModule
  ]
})
export class NuevoPedidoModule { }
