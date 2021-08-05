import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public ORDENES;

  constructor(private api:RestApiService) { }

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(){
    this.api.getOrden()
      .subscribe((resp:any)=>{
        this.ORDENES = resp;
        console.log(this.ORDENES)
      })
  }

  alert(){
    console.log('here I am')
  }

}
