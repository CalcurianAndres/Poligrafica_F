import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  public id!:any;
  public PRODUCTO

  constructor(private route:ActivatedRoute,
              private api:RestApiService) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.api.getOrdenById(this.id)
      .subscribe((resp:any)=>{
        this.PRODUCTO = resp;
        console.log(this.PRODUCTO)
      })
  }

}
