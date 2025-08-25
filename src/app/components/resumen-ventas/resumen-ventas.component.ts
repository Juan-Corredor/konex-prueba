import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { IVenta } from '../../models/venta.model';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-resumen-ventas',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './resumen-ventas.component.html'
})
export class ResumenVentasComponent implements OnInit {
  ventas: IVenta[] = [];
  loading: boolean = false;

  constructor(
    private ventaService: VentaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas() {
    this.loading = true;
    this.ventaService.getVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las ventas'
        });
      }
    });
  }
}
