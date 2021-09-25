import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarObservacionModalComponent } from './agregar-observacion-modal.component';

describe('AgregarObservacionModalComponent', () => {
  let component: AgregarObservacionModalComponent;
  let fixture: ComponentFixture<AgregarObservacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarObservacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarObservacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
