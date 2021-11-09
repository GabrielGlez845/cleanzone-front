import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionesService } from '../../../../../services/funciones.service';
import { Service } from '../../../../models/sells.model';

@Component({
  selector: 'app-notas-details',
  templateUrl: './notas-details.component.html',
  styleUrls: ['./notas-details.component.scss']
})
export class NotasDetailsComponent implements OnInit {
  service_id:number;
  service:Service;
  cargando = true;
  total:number = 0;
  constructor(private route:ActivatedRoute, private funcionesService:FuncionesService) {
    this.route.params.subscribe(data => {
      this.service_id = Number(data['id']);
     });
   }

  ngOnInit(): void {
    this.funcionesService.serviceById(this.service_id).subscribe((resp:Service)=>{
      console.log(resp);
      
      resp[0].details.forEach(detail=>{
        detail.rows.forEach(row =>{
          this.total = this.total + (row.product.pricings[0].price * row.quantity)
        })
      })
      this.service = resp[0]
      this.cargando = false;
    })
  }

}
