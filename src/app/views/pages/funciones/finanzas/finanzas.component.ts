import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../../services/funciones.service';
import { resp } from '../../../models/login.model';


@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {
  expenses = 0;
  availableMoney = 0;
  noAvailableMoney = 0;
  expensiveGraph: any[] = [];
  expensiveGrowthRate: number = 0;
  AVCashGraph: any[] = [];
  AVCashGrowthRate: number = 0;
  NoAVCashGraph: any[] = [];
  NoAVCashGrowthRate: number = 0;
   cargando = true;
  constructor(private funcionesService:FuncionesService) {

  }

  ngOnInit(): void {
    this.funcionesService.getTransactionBalance().subscribe((resp:resp)=>{
      this.expenses = resp.data.gasto;
      this.availableMoney = resp.data.dineroDiponible;
      this.noAvailableMoney = resp.data.dineroNoDisponible;
    })
    this.getExpensiveGraph();
    this.getAvailableCashGraph();
    this.getnoAvalilableCashGraph();
  }

  async getExpensiveGraph(){
    let resp = await this.funcionesService.getExpensesGraph()
    let fechas = resp.data.data;
    if (resp.data.tasa){
      this.expensiveGrowthRate = resp.data.tasa;
    }else{      
      this.expensiveGrowthRate = 0;
    }
    let dataM : {name:string,data:[]}[] = [];
    dataM.push({name:fechas.name,data:[]})
    const dataN = dataM.find(d => d.name == fechas.name) as any;
      fechas.data.forEach((f:any) => {
        dataN.data.push([f.date,f.value]);
      });
     this.expensiveGraph = dataM; 
  }

  async getAvailableCashGraph(){
    let resp = await this.funcionesService.getAvailableCashGraph()
    let fechas = resp.data.data;
    if (resp.data.tasa){
      this.AVCashGrowthRate = resp.data.tasa;
    }else{      
      this.AVCashGrowthRate = 0;
    }
    let dataM : {name:string,data:[]}[] = [];
    dataM.push({name:fechas.name,data:[]})
    const dataN = dataM.find(d => d.name == fechas.name) as any;
      fechas.data.forEach((f:any) => {
        dataN.data.push([f.date,f.value]);
      });
     this.AVCashGraph = dataM; 

  }

  async getnoAvalilableCashGraph(){
    let resp = await this.funcionesService.getNoAvailableCashGraph()
    let fechas = resp.data.data;
    if (resp.data.tasa){
      this.NoAVCashGrowthRate = resp.data.tasa;
    }else{      
      this.NoAVCashGrowthRate = 0;
    }
    let dataM : {name:string,data:[]}[] = [];
    dataM.push({name:fechas.name,data:[]})
    const dataN = dataM.find(d => d.name == fechas.name) as any;
      fechas.data.forEach((f:any) => {
        dataN.data.push([f.date,f.value]);
      });
     this.NoAVCashGraph = dataM; 
    this.cargando = false;
  }

}
