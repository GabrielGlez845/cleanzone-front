import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-prenda-modal',
  templateUrl: './agregar-prenda-modal.component.html',
  styleUrls: ['./agregar-prenda-modal.component.scss']
})
export class AgregarPrendaModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
