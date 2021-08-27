import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RestApiService } from 'src/app/services/rest-api.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  
  public TRABAJOS = [];
  public MAQUINAS;
  public NUEVA_GESTION:boolean = false;
  public FASE = 'IMPRESION';
  public GESTIONES

  constructor(private api:RestApiService) { }

  ngOnInit(): void {
    this.Tarea();
    this.getMaquinas();
    this.getGestiones();
  }

  modal_nueva_gestion(){
    if(!this.NUEVA_GESTION){
      this.NUEVA_GESTION = true
    }else{
      this.NUEVA_GESTION = false
    }
  }

  getMaquinas(){
    this.api.GetMaquinas()
      .subscribe(resp =>{
        this.MAQUINAS = resp
      })
  }

  calcular_Productos(e){
    let value_hojas = e.target.value;
    let orden =  (<HTMLInputElement>document.getElementById('orden_selected')).value;

    let Ejemplares = this.TRABAJOS.find(x => x._id == orden);


    const productos:any = value_hojas * Ejemplares.orden.producto.ejemplares;

    (<HTMLInputElement>document.getElementById('productos_input')).value = productos;
  }

  calcular_Hojas(e){
    let value_productos = e.target.value;

    let orden =  (<HTMLInputElement>document.getElementById('orden_selected')).value;

    let Ejemplares = this.TRABAJOS.find(x => x._id == orden);

    const productos:any = value_productos / Ejemplares.orden.producto.ejemplares;

    (<HTMLInputElement>document.getElementById('hojas_input')).value = productos;
  }

  finalizar(){

    let hoy = moment().format('yyyy-MM-DD');


    let orden =  (<HTMLInputElement>document.getElementById('orden_selected')).value;
    let Ejemplares = this.TRABAJOS.find(x => x._id == orden);

    let productos = (<HTMLInputElement>document.getElementById('productos_input')).value
    let hojas = (<HTMLInputElement>document.getElementById('hojas_input')).value

    let data = {
      orden : orden,
      fecha : hoy,
      maquina: Ejemplares.maquina._id,
      productos:productos,
      hojas:hojas,
    }

    this.api.postGestion(data)
      .subscribe((resp:any)=>{
        (<HTMLInputElement>document.getElementById('productos_input')).value = '';
        (<HTMLInputElement>document.getElementById('hojas_input')).value = '';
        this.modal_nueva_gestion();

        console.log(resp)
      })


  }

  getGestiones(){
    this.api.getGestiones()
      .subscribe((resp:any)=>{
        this.GESTIONES = resp
        console.log(this.GESTIONES)
      })
  }


  Tarea(){
    let hoy = moment().format('yyyy-MM-DD');
    let fase = 'IMPRESION'
    
    this.api.getTrabajos()
      .subscribe((resp:any)=>{

        let nuevo = resp.filter(x => x.maquina.tipo === this.FASE);

        if(nuevo){
          let final = [];
          let Long = nuevo.length;
          for(let i=0; i<Long; i++){
    
            if(hoy >= nuevo[i].fechaI){
              if(hoy <= nuevo[i].fecha){
                this.TRABAJOS.push(nuevo[i])
                console.log(this.TRABAJOS)
              }
            }
    
          }
        }
      })
  }

}

