import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public NUEVA_ORDEN:boolean = false;

  public cs:boolean = false;
  public ps:boolean = false;
  public os:boolean = false;

  public Cantidad_ejemplares = 1000;
  public Ejemplares_montados = 1;
  public demasia = 0;
  public paginas = this.Cantidad_ejemplares / this.Ejemplares_montados;
  public Fases:boolean = false;

  public CLIENTES;
  public PRODUCTOS = [];
  public PRODUCTO = {
    ejemplares:null,
    materiales: [],
    _id:null,
    grupo:null
  };
  public MAQUINAS
  public ALMACEN
  public CANTIDAD = [];

  public CLIENTE
  public OC

  constructor(public api:RestApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.BuscarAlmacen();
  }

  modal_nueva_orden(){
    if(!this.NUEVA_ORDEN){
      this.NUEVA_ORDEN = true
    }else{
      this.NUEVA_ORDEN = false
    }
  }

  obtenerClientes(){
    this.api.GetClientes()
      .subscribe((resp:any)=>{
        this.CLIENTES = resp.clientes
      })
  }

  cliente_selected(e){
    if(e.target.value === '0'){
      this.cs = false 
    }else{
      this.cs = true;
      this.CLIENTE = e.target.value
    }

    this.api.getById(e.target.value)
      .subscribe((resp:any)=>{
        this.PRODUCTOS = resp.productos;
        console.log(this.PRODUCTOS)
      })
  }

  producto_selected(e){

    if(e.target.value === '0'){
      this.ps = false 
    }else{
      this.ps = true;
    }

    this.api.getOneById(e.target.value)
      .subscribe((resp:any)=>{
        this.PRODUCTO = resp.producto;
        this.Ejemplares_montados = this.PRODUCTO.ejemplares;
        this.MAQUINAS = resp.maquinas;
        //   this.modal_nueva_orden()
        let x = this.PRODUCTO.materiales.length;
        this.CANTIDAD = [];
        for(let i=0; i<x; i++){
          const resp = this.ALMACEN.find(resp => resp.nombre === this.PRODUCTO.materiales[i].material)
          this.CANTIDAD.push(resp)
        }

      //   console.log(this.PRODUCTO)
       })
  }

  orden_selected(e){
    if(e.target.value === null){
      this.os = false 
    }else{
      this.os = true;
      this.OC = e.target.value;
    }

    
  }

  BuscarAlmacen(){
    this.api.getAlmacen()
      .subscribe((resp:any) => {
        this.ALMACEN = resp.materiales;
      })
  }

  Cantidad(e){
    this.Cantidad_ejemplares = e.target.value
    this.paginas = this.Cantidad_ejemplares / this.Ejemplares_montados
    this.paginas = this.paginas + this.demasia
    this.paginas = Math.trunc(this.paginas)
  }

  Ejemplares(e){
    this.Ejemplares_montados = e.target.value
    this.paginas = this.Cantidad_ejemplares / this.Ejemplares_montados 
    this.paginas = this.paginas + this.demasia
    this.paginas = Math.trunc(this.paginas)
  }
  Demasia(e){

    this.paginas = this.Cantidad_ejemplares / this.Ejemplares_montados
    this.demasia = e.target.value * this.paginas / 100;
    this.paginas = this.paginas + this.demasia
    this.paginas = Math.trunc(this.paginas)

  }

  TimesTime(){
    this.Fases = true;
    this.modal_nueva_orden()
  }

  colocarFecha(e,fase){
    this.api.getFechas(e.target.value)
      .subscribe((resp:any)=>{

        console.log(resp)
        let cph = 0
        let HorasAgregadas = 0
        let fecha;

        if(resp.trabajo.length > 0){
          cph = resp.trabajo[0].maquina.cph

            // HpC = this.paginas / diasAgregados;
            // let hoymas3 = moment(resp.trabajo[0].fecha).add(HpC, 'hours').format('yyyy-MM-DD');

            fecha = resp.trabajo[0].fecha;
        }else{
          let hoy = moment().format('yyyy-MM-DD');
          fecha = hoy;
        }

        (<HTMLInputElement>document.getElementById(fase)).value = fecha


        if(cph > 0){
          HorasAgregadas = this.paginas / cph;
        }else{
          let MaquinaSelected2 = this.MAQUINAS.find(x => x._id == e.target.value)

          cph = MaquinaSelected2.cph;

          HorasAgregadas = this.paginas / cph;
        }

        let dias = HorasAgregadas / 7;

          let hoymas3 = moment(fecha).add(dias, 'days').format('yyyy-MM-DD');

          (<HTMLInputElement>document.getElementById(`${fase}-C`)).value = hoymas3;

      })
  }

  reprogramar(e, fase){

          let maquina = (<HTMLInputElement>document.getElementById(`${fase}-maquina`)).value
          let MaquinaSelected2 = this.MAQUINAS.find(x => x._id == maquina)

          let cph = MaquinaSelected2.cph;

          let HorasAgregadas = this.paginas / cph;

          let dias = HorasAgregadas / 7;

          let hoymas3 = moment(e.target.value).add(dias, 'days').format('yyyy-MM-DD');

          (<HTMLInputElement>document.getElementById(`${fase}-C`)).value = hoymas3;
  }

  finalizar(cantidad){
    let data = {
      cliente:this.CLIENTE,
      producto:this.PRODUCTO._id,
      orden_compra:this.OC,
      cantidad:cantidad.value,
      paginas:this.paginas
    }

    this.api.postOrden(data)
      .subscribe((resp:any)=>{
        let fases = this.PRODUCTO.grupo.tipos.length
        for(let x=0; x<fases; x++){
          
          let fase = this.PRODUCTO.grupo.tipos[x]
          let maquina = (<HTMLInputElement>document.getElementById(`${fase}-maquina`)).value
          let fechaI = (<HTMLInputElement>document.getElementById(`${fase}`)).value
          let fecha = (<HTMLInputElement>document.getElementById(`${fase}-C`)).value

          let Data = {
            maquina,
            fechaI, 
            fecha,
            orden:resp
          }

          this.api.postOrden2(Data)
            .subscribe((respuesta:any)=>{
              console.log(respuesta)
            })

        }
        this.router.navigate([`/orden-produccion/${resp}`]);
      })
  }

}
