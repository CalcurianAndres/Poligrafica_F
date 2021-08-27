import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';


@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent implements OnInit {

  public MAQUINAS;
  public FUNCIONES = [];
  public TRABAJOS = [];
  public cargado:boolean = false

  constructor(private api:RestApiService) { }

  ngOnInit(): void {
    
    this.ObtenerMaquinas()
    this.obtenerTrabajos()
  }

  ObtenerMaquinas(){
    this.api.GetMaquinas()
      .subscribe(maquinas => {
        this.MAQUINAS = maquinas;
        this.obtenerTipos();
        this.cargado = true
      });
  }

  obtenerTipos(){
    let x = this.MAQUINAS.length;
    for(let i = 0; i< x; i++){
      let inde = this.FUNCIONES.includes(this.MAQUINAS[i].tipo)
      if(!inde){
        this.FUNCIONES.push(this.MAQUINAS[i].tipo)
      }
    }
  }
  
  getFechas(fecha:any, funcion:any){

    let betas = [];

    let nuevo = this.TRABAJOS.filter(x => x.maquina.tipo === funcion);

    if(nuevo){
      let final = [];
      let Long = nuevo.length;
      for(let i=0; i<Long; i++){

        if(fecha >= nuevo[i].fechaI){
          if(fecha <= nuevo[i].fecha){
            final.push(nuevo[i])
          }
        }

      }
      return final;
      
    }

    // console.log(nuevo)
  }
    // console.log(this.TRABAJOS.length )

    // fecha = '2021-08-20'
    // funcion = "IMPRESION"

    
    // let nuevo = this.TRABAJOS.find(x => x.maquina.tipo === funcion);

    // if(nuevo){
    //   let fecha_final = moment(nuevo.fecha).format('yyyy-MM-DD')
    //   let fecha_Inicial = moment(nuevo.fechaI).format('yyyy-MM-DD')
    //   let fecha_actual = moment(fecha).format('yyyy-MM-DD')

    //   console.log(nuevo)

      // let MI:boolean = fecha_actual >= fecha_Inicial;
      // if(MI){
      //   let MF:boolean = fecha_actual <= fecha_final;
      //   console.log(MF)
      // }


    // if(nuevo){
    //   let fecha_final = moment(nuevo.fecha).format('yyyy-MM-DD')
    //   let fecha_Inicial = moment(nuevo.fechaI).format('yyyy-MM-DD')
    //   let fecha_actual = moment(fecha).format('yyyy-MM-DD')
      
    //   let MI:boolean = fecha_actual >= fecha_Inicial;

    //   if(MI){
    //     let MF:boolean = fecha_actual <= fecha_final;
    //     if(MF){
    //       console.log(nuevo,'_',funcion)
    //       return `${nuevo._id.slice(3,6)}`
    //     }
    //   }

    // }

    
    
    // if(nuevo){
    //   let fecha_final = moment(nuevo.fecha).format('yyyy-MM-DD')
    //   let fecha_Inicial = moment(nuevo.fechaI).format('yyyy-MM-DD')
    //   let fecha_actual = moment(fecha).format('yyyy-MM-DD')
      
    //   let MI:boolean = fecha_actual >= fecha_Inicial;
      
    //   if(MI){
    //     let MF:boolean = fecha_actual <= fecha_final;
    //     if(MF){
    //       console.log('aqui',nuevo)
    //        return `${nuevo._id.slice(3,6)}`
    //     }
    //   }
    // }



      // if(nuevo.fecha < fecha)

    // if(nuevo){
    //   let nuevo2 = nuevo.find(x => x.fecha <= fecha)
    //   console.log(nuevo2)
    // }


    // return nuevo

  obtenerTrabajos(){
    this.api.getTrabajos()
      .subscribe((resp:any)=>{
        this.cargado = false;
        this.TRABAJOS = resp;
        console.log(this.TRABAJOS)
        this.cargado = true;
      })
  }

}
