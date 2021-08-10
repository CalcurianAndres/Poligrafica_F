import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public ORDENES;

  constructor(private api:RestApiService,
              private router:Router) { }

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(){
    this.api.getOrden()
      .subscribe((resp:any)=>{
        this.ORDENES = resp;
      })
  }

  alert(id){
    this.router.navigateByUrl(`orden-produccion/${id}`)
  }

}
