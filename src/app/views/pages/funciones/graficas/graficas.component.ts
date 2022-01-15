import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../../services/funciones.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
 sellsGrap:any[] = [];
 clientsCategories: string[] = [];
 clientsData: number[] = [];
 productsCategories: string[] = [];
 productsData: number[] = [];
 cargando = true;
 constructor(private funcionesService:FuncionesService) { }

 ngOnInit(): void {
   this.getSellsGraph();
   this.getClientsGraph();
   this.getProductsGraph();
 }

 async getSellsGraph(){
    let resp = await this.funcionesService.getSellsGraph();
    let fechas = resp.data;
    let dataM : {name:string,data:[]}[] = [];
    fechas.forEach((h:any) => {
     const dataN = dataM.find(d => d.name == h.name) as any;
     if(!dataN){
       dataM.push({name:h.name,data:[]})
     }     
     })
    fechas.forEach((h:any) => {
      const dataN = dataM.find(d => d.name == h.name) as any;
      if(dataN){
        h.data.forEach((f:any) => {
          dataN.data.push([f.date,f.value]);
        });
      }else{
        dataM.push({name:h.name,data:[]})
      }
    })
    this.sellsGrap = dataM; 
 }

 async getClientsGraph(){
  let resp = await this.funcionesService.getClientsGraph();
  let fechas = resp.data;
  fechas.data.forEach(fecha => {
    if (fecha){
      this.clientsCategories.push(fecha.categories);
      this.clientsData.push(fecha.total);
    }
  });
 }

 async getProductsGraph(){
  let resp = await this.funcionesService.getProductsGraph();
  let fechas = resp.data;
  fechas.data.forEach(fecha => {
    if (fecha){
      this.productsCategories.push(fecha.categories);
      this.productsData.push(fecha.total);
    }
  });
  this.cargando =false
 }

}
