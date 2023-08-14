import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormEmpleadoPuestoComponent } from './edit-form-empleado-puesto.component';

describe('EditFormEmpleadoPuestoComponent', () => {
  let component: EditFormEmpleadoPuestoComponent;
  let fixture: ComponentFixture<EditFormEmpleadoPuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormEmpleadoPuestoComponent]
    });
    fixture = TestBed.createComponent(EditFormEmpleadoPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
