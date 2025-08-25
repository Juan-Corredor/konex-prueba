import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { VentaService } from '../../services/venta.service';
import { IMedicamento } from '../../models/medicamento.model';
import { IVenta } from '../../models/venta.model';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
})
export class RegistrarVentaComponent {
  // Controla la visibilidad de la modal
  public display: boolean = false;

  // Información de la venta
  public venta: IVenta = {
    fechaHora: new Date(),
    medicamentoId: 0, // valor por defecto
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    medicamentoNombre: '',
  };

  @Output() ventaAgregada: EventEmitter<void> = new EventEmitter<void>();

  // Medicamento seleccionado para la venta
  public medicamento: IMedicamento | null = null;

  constructor(
    private readonly ventaService: VentaService,
    private readonly messageService: MessageService
  ) {}

  /**
   * Abre la modal para registrar venta de un medicamento.
   * Inicializa los datos de la venta con el medicamento seleccionado.
   */
  public showDialog(med: IMedicamento): void {
    this.medicamento = med;
    this.venta = {
      fechaHora: new Date(),
      medicamentoId: med.id!,
      cantidad: 1,
      valorUnitario: med.valorUnitario,
      valorTotal: med.valorUnitario,
      medicamentoNombre: med.nombre,
    };
    this.display = true;
  }

  /*** Cierra la modal */
  public hideDialog(): void {
    this.display = false;
  }

  /** * Calcula el valor total de la venta en base a cantidad y valor unitario */
  public calcularTotal(): void {
    this.venta.valorTotal = this.venta.cantidad * this.venta.valorUnitario;
  }

  /*** Envía la venta al backend y muestra toast de éxito o error*/
  public registrarVenta(): void {
    this.ventaService.registrarVenta(this.venta).subscribe({
      next: () => {
        //mostrar toast de éxito
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Venta registrada correctamente',
          life: 3000,
        });
        //emitir evento al padre
        this.ventaAgregada.emit();

        this.hideDialog();
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la venta',
          life: 3000,
        });
      },
    });
  }
}
