import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public NUEVO_PRODUCTO:boolean = false;
  public ALMACEN;
  public SECCIONES

  public PESO= 0
  public GRAMAJE = 300
  public ANCHO= 0
  public LARGO= 0
  public HOJAS = 0

  public PESO_= 0
  public GRAMAJE_ = 300
  public ANCHO_= 0
  public LARGO_= 0
  public HOJAS_ = 0

  public OTRO:boolean = true;
  public Gs;

  public CONVERSION:boolean = false;
  public BOBINAS:boolean = false;
  public CONSULTAB:boolean = false;

  public BOBINAS_;

  InventarioForm:FormGroup = this.fb.group({
    producto:['', Validators.required],
    cantidad:['', Validators.required],
    NewControl:['']
  });

  BobinaForm:FormGroup = this.fb.group({
    Nbobina:['', Validators.required],
    material:['', Validators.required],
    gramaje:['', Validators.required],
    ancho:['', Validators.required],
    peso:['', Validators.required]
  });

  constructor(private fb:FormBuilder,
              private api:RestApiService) { }

  ngOnInit(): void {
    this.BuscarAlmacen();
    this.BuscarGruposEnAlmacen();
    this.getbobinas();
    this.Gs = (<HTMLInputElement>document.getElementById('selected')).value
  }

  Cambio_opciones(e){
    if(e === 'otros'){
      this.OTRO = true
    }else{
      this.OTRO = false;
      this.Gs = e;
    }
  }

  public Modal_Almacen(){
    if(this.NUEVO_PRODUCTO){
      this.NUEVO_PRODUCTO = false;
    }else{
      this.NUEVO_PRODUCTO = true;
    }
  }

  public Modal_bobinas(){
    if(this.BOBINAS){
      this.BOBINAS = false;
    }else{
      this.BOBINAS = true;
    }
  }

  public modal_Conversion(){
    if(this.CONVERSION){
      this.CONVERSION = false;
    }else{
      this.CONVERSION = true;
    }
  }

  public check_bobinas(){
    if(this.CONSULTAB){
      this.CONSULTAB = false;
    }else{
      this.CONSULTAB = true;
    }
  }

  BuscarGruposEnAlmacen(){
    this.api.GetGrupoMp()
      .subscribe((resp:any)=>{
        this.SECCIONES = resp
      })
  }

  BuscarAlmacen(){
    this.api.getAlmacen()
      .subscribe((resp:any) => {
        this.ALMACEN = resp.materiales;
        console.log(this.ALMACEN)
      })
  }

  Almacenar(){

    let grupo;

    if(this.OTRO){
    grupo = this.InventarioForm.get('NewControl').value
    }
    else{
      grupo = this.Gs;
    }
    
    const data = {
      producto: this.InventarioForm.get('producto').value,
      cantidad: this.InventarioForm.get('cantidad').value,
      grupo,
      nuevo:this.OTRO

    }

    if(this.InventarioForm.invalid){
      return
    }

     this.api.PostAlmacen(data)
      .subscribe(resp=>{
         this.InventarioForm.reset();
         this.BuscarAlmacen();
         this.BuscarGruposEnAlmacen();
         this.Modal_Almacen();
       })

   }

   Peso(e){
    this.PESO = e.target.value
    this.HOJAS = this.PESO*10000000000
    let otro = this.GRAMAJE*this.ANCHO*this.LARGO
    this.HOJAS = this.HOJAS/otro
    this.HOJAS = Math.trunc(this.HOJAS)
    // /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Gramaje(e){
     this.GRAMAJE = e.target.value
     this.HOJAS = this.PESO*10000000000
     let otro = this.GRAMAJE*this.ANCHO*this.LARGO
     this.HOJAS = this.HOJAS/otro
     this.HOJAS = Math.trunc(this.HOJAS)
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Ancho(e){
     this.ANCHO = e.target.value
     this.HOJAS = this.PESO*10000000000
     let otro = this.GRAMAJE*this.ANCHO*this.LARGO
     this.HOJAS = this.HOJAS/otro
     this.HOJAS = Math.trunc(this.HOJAS)
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Largo(e){
     this.LARGO = e.target.value
     this.HOJAS = this.PESO*10000000000
     let otro = this.GRAMAJE*this.ANCHO*this.LARGO
     this.HOJAS = this.HOJAS/otro
     this.HOJAS = Math.trunc(this.HOJAS)
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }

  //  ***********************************************************
  Hojas_(e){
    this.HOJAS_ = e.target.value
    let all = this.HOJAS_ * this.GRAMAJE_*this.ANCHO_*this.LARGO_
    this.PESO_ = all / 10000000000;
    // /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Gramaje_(e){
     this.GRAMAJE_ = e.target.value
     let all = this.HOJAS_ * this.GRAMAJE_*this.ANCHO_*this.LARGO_
     this.PESO_ = all / 10000000000;
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Ancho_(e){
     this.ANCHO_ = e.target.value
     let all = this.HOJAS_ * this.GRAMAJE_*this.ANCHO_*this.LARGO_
     this.PESO_ = all / 10000000000;
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Largo_(e){
     this.LARGO_ = e.target.value
     let all = this.HOJAS_ * this.GRAMAJE_*this.ANCHO_*this.LARGO_
     this.PESO_ = all / 10000000000;
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
  //  ***********************************************************


  nuevaBobina(){
    this.api.postNuevaBobina(this.BobinaForm.value)
      .subscribe((resp:any)=>{
        this.BobinaForm.reset();
        this.Modal_bobinas();
        this.getbobinas();
        console.log(resp);
      })
  }

  getbobinas(){
    this.api.getBobina()
      .subscribe((resp:any)=>{
        this.BOBINAS_ = resp;
        console.log(this.BOBINAS_)
      })
  }
}
