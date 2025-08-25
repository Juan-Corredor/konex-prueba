import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IMedicamento } from '../../models/medicamento.model';
import { MedicamentoService } from '../../services/medicamento.service';
import { MedicamentoFormComponent } from '../medicamento-form/medicamento-form.component';
import { RegistrarVentaComponent } from '../registrar-venta/registrar-venta.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  standalone: true,
  providers: [MedicamentoService, MessageService, ConfirmationService],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    MedicamentoFormComponent,
    RegistrarVentaComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class InventarioComponent implements OnInit {
  public medicamentos: IMedicamento[] = [];

  constructor(
    private readonly medicamentoService: MedicamentoService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  @ViewChild('ventaModal') ventaModal: any;

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  public cargarMedicamentos(): void {
    this.medicamentoService.getMedicamentos().subscribe({
      next: (res) => (this.medicamentos = res),
      error: (err) => console.error('Error cargando medicamentos', err),
    });
  }

  public venderMedicamento(medicamento: IMedicamento): void {
    this.ventaModal.showDialog(medicamento);
  }

  public eliminarMedicamento(medicamento: IMedicamento): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el medicamento "${medicamento.nombre}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicamentoService.eliminarMedicamento(medicamento.id!).subscribe({
          next: () => {
            this.medicamentos = this.medicamentos.filter( //p
              (m) => m.id !== medicamento.id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: `Medicamento "${medicamento.nombre}" eliminado correctamente`,
              life: 3000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `No se pudo eliminar "${medicamento.nombre}"`,
              life: 3000,
            });
            console.error(err);
          },
        });
      },
    });
  }
}
