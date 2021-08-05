import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { OrdenesRoutingModule } from './ordenes-routing.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    OrdenesRoutingModule
  ]
})
export class OrdenesModule { }
