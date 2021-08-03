import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public NUEVO_CLIENTE:boolean = false;
  public CLIENTES;
  public MATERIALES;
  public MATERIALES_NECESARIOS = [];
  public NUEVO_PRODUCTO:boolean = false;
  public GRUPOS;

  public GRUPOS_MATERIA;

  public PRODUCTOS;

  ClienteForm:FormGroup = this.fb.group({
    nombre:['',Validators.required]
  })

  constructor(private api:RestApiService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this. obtenerGrupodeMateriales();
    this.obtenerClientes();
    this.obtenerMateriales();
    this.obtenerGrupos();
    let cliente_id = (<HTMLInputElement>document.getElementById('cliente_Seleccionado')).value;
    this.buscar_producto(cliente_id);
  }

  public Modal_Cliente(){
    if(this.NUEVO_CLIENTE){
      this.NUEVO_CLIENTE = false;
    }else{
      this.NUEVO_CLIENTE = true;
    }
  }

  public Modal_Producto(){
    if(this.NUEVO_PRODUCTO){
      this.NUEVO_PRODUCTO = false;
    }else{
      this.NUEVO_PRODUCTO = true;
    }
  }

  enable(input){
    let campo = (<HTMLInputElement>document.getElementById(input)).disabled;

    if(campo){
      (<HTMLInputElement>document.getElementById(input)).disabled = false;
      (<HTMLInputElement>document.getElementById(input)).focus();
    } else {
      (<HTMLInputElement>document.getElementById(input)).disabled = true;
      let buscarSiExiste = this.MATERIALES_NECESARIOS.find(c => c.material == input);
      if(buscarSiExiste){
        let index = this.MATERIALES_NECESARIOS.indexOf(buscarSiExiste)
        this.MATERIALES_NECESARIOS.splice(index, 1)
      }
  }
}

just_a_sec(e){
  let nuevo = this.MATERIALES_NECESARIOS.find(c => c.material == e.target.id);
  let index;
  if(!nuevo){
    let data = {
      material:e.target.id,
      cantidad:e.target.value
    }

    this.MATERIALES_NECESARIOS.push(data)
  }else{
    index = this.MATERIALES_NECESARIOS.indexOf(nuevo)
    this.MATERIALES_NECESARIOS[index].cantidad = e.target.value
  }
}

  obtenerGrupodeMateriales(){
    this.api.GetGrupoMp()
      .subscribe((resp:any)=>{
        this.GRUPOS_MATERIA = resp;
      })
  }
  obtenerClientes(){
    this.api.GetClientes()
      .subscribe((resp:any) =>{
        this.CLIENTES = resp.clientes
      })
  }

  addCliente(){
    if(this.ClienteForm.invalid) {
      return;
    }

    this.api.PostClientes(this.ClienteForm.value)
        .subscribe((resp:any)=>{
          this.obtenerClientes();
          this.ClienteForm.reset();
          this.NUEVO_CLIENTE = false;
        })
  }

  //--------------------- PRODUCTOS----

  obtenerMateriales(){
    this.api.getAlmacen()
      .subscribe((resp:any)=>{
        this.MATERIALES = resp.materiales
      })
  }

  obtenerGrupos(){
    this.api.getGrupos()
      .subscribe((resp:any)=>{
        this.GRUPOS = resp.grupos
      })
  }

  Ordenar_Producto(){
    let valor = (<HTMLInputElement>document.getElementById('material_Necesario')).value
    let inde = this.MATERIALES_NECESARIOS.includes(valor);

    if(!inde){
      this.MATERIALES_NECESARIOS.push(valor)
    }

    
  }

  finalizar(){

    let data = {
      cliente: (<HTMLInputElement>document.getElementById('cliente_Seleccionado')).value,
      producto:(<HTMLInputElement>document.getElementById('nombre_nuevo_producto')).value,
      grupo:(<HTMLInputElement>document.getElementById('grupo_producto')).value,
      materiales: this.MATERIALES_NECESARIOS
    }

    
    this.api.postProducto(data)
      .subscribe((resp:any)=>{
        this.Modal_Producto();
        let cliente_id = (<HTMLInputElement>document.getElementById('cliente_Seleccionado')).value;
        this.buscar_producto(cliente_id);
      })
  }

  
  buscar_producto(e){

    this.api.getById(e.target.value)
      .subscribe((resp:any)=>{
        this.PRODUCTOS = resp.productos;
      });
  }


}
