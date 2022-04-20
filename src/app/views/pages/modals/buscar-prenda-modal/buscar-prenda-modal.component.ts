import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-prenda-modal',
  templateUrl: './buscar-prenda-modal.component.html',
  styleUrls: ['./buscar-prenda-modal.component.scss']
})
export class BuscarPrendaModalComponent implements OnInit {
  search = '';
  @Input() products = [];
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.products)
  }

  agregarPrenda(){
    
  }

}
