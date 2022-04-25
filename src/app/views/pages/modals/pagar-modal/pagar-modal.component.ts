import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasPAGService } from '../../ventas-entregas/ventas/ventas-pag.service';
import { VentasService } from '../../../../services/ventas.service';
import { Payment, Row, Detail, Service } from '../../../models/sells.model';
import { EntregasPagService } from '../../ventas-entregas/entregas/entregas-pag.service';
import { FuncionesService } from '../../../../services/funciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Img, PdfMakeWrapper,QR,Table,Txt } from 'pdfmake-wrapper';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { format, parseISO, parseJSON } from 'date-fns';
import { jsPDF } from "jspdf";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-pagar-modal',
  templateUrl: './pagar-modal.component.html',
  styleUrls: ['./pagar-modal.component.scss']
})
export class PagarModalComponent implements OnInit {
  @Input() total;
  amount:number = 0;
  @Input() serviceId;
  @Input() tipo : string;
  formaPago = [{id:1,name:'Pago'},{id:2,name:'Abono'},{id:3,name:'Credito'}];
  formaPagoSeleccionada = null;
  formaNovalida = false;
  amountNovalida = false;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  value: string = 'prueba';
  
  constructor(public activeModal: NgbActiveModal, public ventasPagService:VentasPAGService,private ventasService:VentasService
            , private entregasPagService:EntregasPagService, private funcionesService:FuncionesService,
              private route:Router) { }

  ngOnInit(): void {
    this.formaNovalida = false;
    this.amountNovalida = false;
  }

  //change for transaction in back 
  async pagar(){
    if (this.validaciones()){
    if(this.tipo === 'ventas'){
      const date = new Date();
      let pay:Payment={
        id:date.getTime(), //not necesary
        amount:this.amount,
        serviceId:10, //not necesary
      }
           console.log(this.ventasPagService.venta)
           console.log(this.ventasPagService.ventaDetalle)
           console.log(this.ventasPagService.Fila)
       
           //pdf
         //  this.downloadAsPDF()
          //  this.pdfgenerate();
          
      this.ventasService.postSell(this.ventasPagService.venta,this.ventasPagService.ventaDetalle,this.ventasPagService.Fila,pay).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.ok){
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'servicio creado con exito', icon: 'success'}
           );
           //imprimir recibo
           this.downloadAsPDF();
           this.activeModal.close('modal cerrado'); //enviar a otro lado o borrar los valores
        }
      },err =>{
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'Error al pagar', icon: 'error'}
         );
      })
    
    }else if (this.tipo === 'entregas'){
      if (this.amount >= this.total){
        this.entregasPagService.statusOneToTwo();
        let rows: Row[] = []
        let details : Detail[] = []    
        let service : Service;
        this.entregasPagService.services.find(service1 => {
          if(service1.id === this.serviceId){
            service = service1;
          }
        })
          this.funcionesService.statusChangeService(service).subscribe(resp=>{
            details = service.details 
            console.log(resp)      
            this.funcionesService.statusChangeDetail(details).subscribe(resp=>{
              console.log(resp)
              details.find(detail =>{ 
                detail.rows.find(row=>{
                  console.log('row',row)
                  rows.push(row)
                })  
              })
              this.funcionesService.statusChangeRow(rows).subscribe(resp =>{
                console.log(resp);
              })
            })
          })          
      }else{
        console.log('No es suficiente el saldo')
      }    
   }
  }else{
    console.log('No valido')
  }
  }

  async downloadAsPDF() {
    let largo = document.getElementById("ticket");
    let px = (largo.clientHeight)+(50)
    console.log(px)
    const pdf = new jsPDF("p", "px", [  294.80314961 , px ]);
   
     await pdf.html(document.getElementById('ticket'), {
       callback: (pdf) => {
            pdf.output('dataurlnewwindow');
         }
     });
   }

 
  validaciones():boolean {
    if (this.formaPagoSeleccionada === null || undefined){
      this.formaNovalida = true;
      return false;
    }else{
      this.formaNovalida = false;
    }
    if (this.formaPagoSeleccionada != 3 && this.amount  <= 0){
      this.amountNovalida = true;
      return false;
    }else{
      this.amountNovalida = false;
    }
    if (this.formaPagoSeleccionada === 1 && this.amount  < this.total){
      this.amountNovalida = true;
      return false;
    }else{
      this.amountNovalida = false;
    }
    return true
  }

  //pdf make
  createTable(items){
    return new Table([
        ['Producto','Precio','Cantidad'],
        ...this.extractData(items)
    ]).alignment('center').fontSize(6).end
}

//padf make
extractData(items){
  return items.map(row=> [row.product.name,'$'+row.product.pricings[0].price,row.quantity])
}

//pdf - make
async pdfgenerate(){
     //pdf
    const pdf = new PdfMakeWrapper();           
    pdf.pageSize({
      width: 160,
      height: 594
  });
  pdf.pageOrientation('portrait');
  pdf.pageMargins([ 40, 0, 40, 10 ]);
  //img
  const img =  await new Img('/assets/images/clean-ticket.png')
  img.width(70)
  img.alignment('center');
  pdf.add( await img.build() );
  
  //texto
  pdf.add(
    new Txt('FERRERIA 1316').alignment('center').fontSize(7).end
  )
  pdf.add(
    new Txt('ALAMO INDUSTRIAL').alignment('center').fontSize(7).end
  )
  pdf.add(
    new Txt('GUADALAJARA JALISCO').alignment('center').fontSize(7).end
  )
  pdf.add(
    new Txt('CP 44490').alignment('center').fontSize(7).end
  )
  pdf.add(
    new Txt('TELS: 3335-3262').alignment('center').fontSize(7).end
  )
  
   pdf.add(
    new Txt('-').alignment('center').fontSize(7).end
  )
  //QR
  pdf.add(
    new QR('my code').fit(70).alignment('center').end
  )
  
  // pdf.add(
  //   new Txt(`123`).alignment('center').fontSize(7).end
  // )
  pdf.add(
   new Txt('-').alignment('center').fontSize(7).end
  )
  
  //cajero
  pdf.add(
    new Txt(`FECHA: ${format( this.ventasPagService.venta.createdAt,'MM/dd/yyyy')}`).alignment('left').fontSize(6).end
   )

   pdf.add(
    new Txt(`ENTREGA: ${format(new Date(),'MM/dd/yyyy')}`).alignment('left').fontSize(6).end
   )

   pdf.add(
    new Txt(`CAJERO: ${this.ventasPagService.venta.employee.name}`).alignment('left').fontSize(6).end
   )

   pdf.add(
    new Txt(`NOMBRE DEL CLIENTE: ${this.ventasPagService.venta.user.name}`).alignment('left').fontSize(6).end
   )

   pdf.add(
    new Txt(`TELEFONO DEL CLIENTE: ${this.ventasPagService.venta.user.phone}`).alignment('left').fontSize(6).end
   )

  //productos
  for (const row of this.ventasPagService.Fila) {
    pdf.add(
      new Txt('-').alignment('center').fontSize(6).end
    )

    pdf.add(
      new Txt(`***${row.product.category.name }***`).alignment('center').fontSize(6).end
     )

    pdf.add(
    new Txt(`${row.quantity}.- ${row.product.name} $ ${row.product.pricings[0].price}`).alignment('center').fontSize(6).end
    )

    // pdf.add(
    //   new Txt(`${row.quantity}`).alignment('right').fontSize(6).end
    //   )

      pdf.add(
        new Txt('-').alignment('center').fontSize(6).end
      )

  }

  //totales
  pdf.add(
    new Txt(`TOTAL: ${this.total}`).alignment('right').fontSize(7).end
  )

  

 //  pdf.add(this.createTable(this.ventasPagService.Fila))
   pdf.create().print();
  //pdf.create().open();
   //  pdf.add(this.createTable(this.ventasPagService.Fila))
     //pdf.create().print();
   
  }
}
