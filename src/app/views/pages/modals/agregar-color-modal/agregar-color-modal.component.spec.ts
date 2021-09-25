import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarColorModalComponent } from './agregar-color-modal.component';

describe('AgregarColorModalComponent', () => {
  let component: AgregarColorModalComponent;
  let fixture: ComponentFixture<AgregarColorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarColorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
