import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './components/personas/personas.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { EmpleadosPuestosComponent } from './components/empleados-puestos/empleados-puestos.component';

const routes: Routes = [
  { path: 'personas', component: PersonasComponent },
  { path: 'puestos', component: PuestosComponent },
  { path: 'empleados-puestos', component: EmpleadosPuestosComponent },
  { path: '', redirectTo: '/personas', pathMatch: 'full' }, // Redireccionar a /personas por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
