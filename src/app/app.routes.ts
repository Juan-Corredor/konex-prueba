import { Routes } from '@angular/router';
import { ResumenVentasComponent } from './components/resumen-ventas/resumen-ventas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inventario', pathMatch: 'full' },
  { path: 'inventario', loadComponent: () => import('./components/inventario/inventario.component').then(m => m.InventarioComponent) },
  { path: 'resumen-ventas', loadComponent: () => import('./components/resumen-ventas/resumen-ventas.component').then(m => m.ResumenVentasComponent) },
];
