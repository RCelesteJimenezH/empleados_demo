import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPersonaComponent } from './edit-form-persona.component';

describe('EditFormPersonaComponent', () => {
  let component: EditFormPersonaComponent;
  let fixture: ComponentFixture<EditFormPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormPersonaComponent]
    });
    fixture = TestBed.createComponent(EditFormPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
