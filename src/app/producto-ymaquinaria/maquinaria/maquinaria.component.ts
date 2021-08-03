import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { MaquinaInterface } from 'src/app/interface/maquinas.interfase';

@Component({
  selector: 'app-maquinaria',
  templateUrl: './maquinaria.component.html',
  styleUrls: ['./maquinaria.component.css']
})
export class MaquinariaComponent implements OnInit {

  public NUEVA_MAQUINA:boolean = false;
  public NUEVO_GRUPO:boolean = false;
  public MAQUINAS:MaquinaInterface[] = [];
  public FUNCIONES = [];
  public FASES = [];
  public GRUPOS = [];


  maquinaForm: FormGroup = this.fb.group({
    nombre:['', Validators.required],
    tipo:['', Validators.required],
    colores:[''],
    cph:['', Validators.required],
  })

  constructor(private fb:FormBuilder,
              private api:RestApiService) { }

  ngOnInit(): void {
    this.ObtenerMaquinas();
    this.obtenerGrupos();
  }

  public Modal_Maquina(){
    if(this.NUEVA_MAQUINA){
      this.NUEVA_MAQUINA = false;
    }else{
      this.NUEVA_MAQUINA = true;
    }
  }

  nuevaMaquina(){
    this.api.PostMaquinas(this.maquinaForm.value)
      .subscribe(resp =>{
        this.maquinaForm.reset();
        this.NUEVA_MAQUINA = false;
        this.ObtenerMaquinas();
      })
  }

  ObtenerMaquinas(){
    this.api.GetMaquinas()
      .subscribe(maquinas => {
        this.MAQUINAS = maquinas;
        this.obtenerTipos();
      });
  }

  BorrarMaquina(id:any){
    this.api.DeleteMaquinas(id)
      .subscribe(resp=>{
        this.ObtenerMaquinas();
      })
  }

  // ----------------------GRUPOS -------------

  public Modal_Grupo(){
    if(this.NUEVO_GRUPO){
      this.NUEVO_GRUPO = false
    }else{
      this.NUEVO_GRUPO = true
    }
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

  agregarTipo(){
    let este = (<HTMLInputElement>document.getElementById('tipos')).value;
    let inde = this.FASES.includes(este)
      if(!inde){
        this.FASES.push(este)
      }
  }

  obtenerGrupos(){
    this.api.getGrupos()
      .subscribe((resp:any) => {
        this.GRUPOS = resp.grupos
      })
  }

  nuevoTipo(){
    let name = (<HTMLInputElement>document.getElementById('name')).value;

    let nuevoTipo = {
      nombre:name,
      tipos:this.FASES
    }

    // AGREGAR A LA BASE DE DATOS****************
    this.api.PostGrupos(nuevoTipo)
      .subscribe(resp =>{
        this.obtenerGrupos();
        this.NUEVO_GRUPO = false
      })

  }




}
