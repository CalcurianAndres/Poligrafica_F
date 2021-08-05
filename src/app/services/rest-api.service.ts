import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MaquinaInterface } from '../interface/maquinas.interfase';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {


  api_url = environment.api;

  constructor(public http:HttpClient) { }

  // **************************************************************************
  // **************************** MAQUINAS ************************************
  // ************************************************************************** 

  GetMaquinas(){
    const url = `${this.api_url}/maquinas`
    return this.http.get<MaquinaInterface[]>(url)
  }

  PostMaquinas(data:MaquinaInterface){
    const url = `${this.api_url}/maquinas`
    return this.http.post<MaquinaInterface>(url,data)
  }

  DeleteMaquinas(id){
    const url = `${this.api_url}/maquinas/${id}`
    return this.http.delete(url)
  }


  // **************************************************************************
  // **************************** GRUPOS **************************************
  // **************************************************************************

  getGrupos(){
    const url = `${this.api_url}/grupos`
    return this.http.get(url)
  }

  PostGrupos(data:any){
    const url = `${this.api_url}/grupos`
    return this.http.post(url,data)
  }

  // ****************************************************************************
  // **************************** CLIENTES **************************************
  // ****************************************************************************

  GetClientes(){
    const url = `${this.api_url}/clientes`
    return this.http.get(url)
  }

  PostClientes(data){
    const url = `${this.api_url}/clientes`
    return this.http.post(url,data)
  }

  // ****************************************************************************
  // **************************** Almacen ***************************************
  // ****************************************************************************


  getAlmacen(){
    const url = `${this.api_url}/materiales`
    return this.http.get(url)
  }

  GetGrupoMp(){
    const url = `${this.api_url}/tipo-materia-prima`
    return this.http.get(url)
  }

  PostAlmacen(data){
    const url = `${this.api_url}/nuevo-material`
    return this.http.post(url,data)
  }

  // ****************************************************************************
  // **************************** Productos *************************************
  // ****************************************************************************

  postProducto(data){
    const url = `${this.api_url}/nuevo-producto`
    return this.http.post(url,data)
  }

  getById(id){
    const url = `${this.api_url}/productos/${id}`
    return this.http.get(url)
  }

  getOneById(id){
    const url = `${this.api_url}/producto/${id}`
    return this.http.get(url)
  }


  getFechas(id){
    const url = `${this.api_url}/trabajos/${id}`
    return this.http.get(url);
  }

  postOrden(data){
    const url = `${this.api_url}/orden`
    return this.http.post(url,data)
  }
  postOrden2(data){
    const url = `${this.api_url}/trabajos`
    return this.http.post(url,data)
  }
  getOrdenById(id){
    const url = `${this.api_url}/orden/${id}`
    return this.http.get(url);
  }
  getOrden(){
    const url = `${this.api_url}/orden`
    return this.http.get(url);
  }
  
}
