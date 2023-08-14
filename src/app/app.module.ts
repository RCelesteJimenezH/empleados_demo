import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { EmpleadosPuestosComponent } from './components/empleados-puestos/empleados-puestos.component';
import { CrudTableModule } from './components/crud-table/crud-table.module';
import { CrudModalModule } from './components/crud-modal/crud-modal.module';
import { EditFormModule } from './components/Edit-form/edit-form.module';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PuestosComponent,
    EmpleadosPuestosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    CrudTableModule,
    CrudModalModule,
    EditFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
