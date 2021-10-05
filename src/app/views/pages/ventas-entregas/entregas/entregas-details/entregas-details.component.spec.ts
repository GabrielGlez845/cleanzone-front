import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasDetailsComponent } from './entregas-details.component';

describe('EntregasDetailsComponent', () => {
  let component: EntregasDetailsComponent;
  let fixture: ComponentFixture<EntregasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
