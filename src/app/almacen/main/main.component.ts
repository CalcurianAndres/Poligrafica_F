import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { PdfMakeWrapper, Txt, Img, Table, Cell, Columns } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from 'moment';



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

  public boolean_sustrato:boolean = false;
  public Sustratos;

  public Mat_Selected;
  public Num_Bobina

  InventarioForm:FormGroup = this.fb.group({
    producto:['', Validators.required],
    cantidad:['', Validators.required],
    unidad:['',Validators.required],
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
    this.getSustratos();
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
      unidad: this.InventarioForm.get('unidad').value,
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
         this.getSustratos();
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
     this.GRAMAJE = e
     this.HOJAS = this.PESO*10000000000
     let otro = this.GRAMAJE*this.ANCHO*this.LARGO
     this.HOJAS = this.HOJAS/otro
     this.HOJAS = Math.trunc(this.HOJAS)
     //  /( this.GRAMAJE*this.ANCHO*this.LARGO)
   }
   Ancho(e){
     this.ANCHO = e
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

  Buscar_Bobina(e){
    let TheBobina = this.BOBINAS_.find(x => x._id == e.target.value)
    console.log(TheBobina.gramaje)

    if(TheBobina){
      (<HTMLInputElement>document.getElementById('_gramaje')).value = TheBobina.gramaje
      this.Gramaje(TheBobina.gramaje)
      if(TheBobina){
      (<HTMLInputElement>document.getElementById('_ancho')).value = TheBobina.ancho
      this.Ancho(TheBobina.ancho)
      }
      if(TheBobina){
        console.log(TheBobina)
        this.Mat_Selected = TheBobina.material;
        this.Num_Bobina = TheBobina.Nbobina;
      }
    }

  }

  Generar_Conversion(){
    let bobina = (<HTMLInputElement>document.getElementById('bobina_selected')).value;
    let peso = (<HTMLInputElement>document.getElementById('_peso')).value;
    let gramaje = (<HTMLInputElement>document.getElementById('_gramaje')).value;
    let ancho = (<HTMLInputElement>document.getElementById('_ancho')).value;
    let largo = (<HTMLInputElement>document.getElementById('_largo')).value;

    let data = {
      material:this.Mat_Selected,
      codigo:this.Num_Bobina,
      peso,
      bobina,
      hojas:this.HOJAS
    }

    let hoy = moment().format('DD/MM/YYYY')

    this.api.postNuevoSustrato(data)
      .subscribe((resp:any)=>{
        this.modal_Conversion();
        this.getbobinas();
        this.BuscarAlmacen();
        this.getSustratos();
        console.log(resp)

        async function recibo() {
          const pdf = new PdfMakeWrapper();
          PdfMakeWrapper.setFonts(pdfFonts);
          pdf.pageOrientation('landscape');

          pdf.header('Solicitud de Conversión');

          pdf.add(

            new Txt('Solicitud de Conversión').alignment('center').bold().fontSize(25).end,
            
          )
          pdf.add(

            pdf.ln(2)
            
          )


          pdf.add(
            new Columns([`Fecha de Solicitud: ${hoy}`, 'Cliente: POLIGRAFICA DE VENEZUELA C.A']).columnGap(10).end
          )

          pdf.add(

            pdf.ln(2)
            
          )
          pdf.add(
            new Table([
              [
                new Cell( new Txt(`Conv #: ${resp}`).end).border([false, false]).colSpan(5).end,
                'Conv',
                'Conv',
                'Conv',
                'Conv',
                new Cell( new Txt('Cantidad a Convertir').end).fontSize(15).colSpan(3).end,
                '',
                '',
                new Cell( new Txt('').end).border([false, false]).end,
              ],
              [
                'Material',
                'Gramaje',
                'Ancho Bobina',
                new Cell( new Txt('Corte').end).colSpan(2).end,
                'Corte',
                '# Bobina',
                'Peso',
                'Hojas',
                'Observación'
              ],
              [
                `${data.material}`,
                `${gramaje}`,
                `${ancho}`,
                `${ancho}`,
                `${largo}`,
                `${data.codigo}`,
                `${peso}`,
                new Cell( new Txt(`${data.hojas}`,).color('red').end).end,
                ''
              ],
              [
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' '
              ],
              [
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' '
              ],
              [
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' ',
                ' '
              ],
              [
                new Cell( new Txt('').end).border([false,false]).colSpan(3).end,
                '',
                '',
                new Cell( new Txt('Total').end).colSpan(3).end,
                '',
                '',
                `${peso}`,
                new Cell( new Txt(`${data.hojas}`,).color('red').end).end,
                ''
              ],
            ]).widths(['10%','10%','10%','10%','10%','10%','10%','10%','20%']).alignment('center').end
          )
          pdf.add(

            pdf.ln(2)
            
          )
          pdf.add(
            new Table([
              [
                'Solicitado por:'
              ],
              [
                'Jaime San Juan'
              ]
            ]).widths(['25%']).end
          )

          pdf.create().download()

        }

        recibo();

      })
  }

  getSustratos(){
    this.api.getSustratos()
      .subscribe((resp:any)=>{
        console.log(resp)
        if(resp.length>0){
          this.boolean_sustrato = true;
          this.Sustratos = resp;
        }
      })
  }




}
