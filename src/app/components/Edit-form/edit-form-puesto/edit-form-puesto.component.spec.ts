import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPuestoComponent } from './edit-form-puesto.component';

describe('EditFormPuestoComponent', () => {
  let component: EditFormPuestoComponent;
  let fixture: ComponentFixture<EditFormPuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormPuestoComponent]
    });
    fixture = TestBed.createComponent(EditFormPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
