import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentoService } from '../../services/medicamento.service';
import { IMedicamento } from '../../models/medicamento.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-medicamento-form',
  templateUrl: './medicamento-form.component.html',
  standalone: true,
  providers: [MedicamentoService, MessageService],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    FormsModule,
    ToastModule,
  ],
})
export class MedicamentoFormComponent {
  public display = false;

  public medicamento: IMedicamento = this.getMedicamentoVacio();

  @Input() medicamentoActual: IMedicamento | null = null;
  @Output() medicamentoAgregado = new EventEmitter<void>();

  constructor(
    private readonly medicamentoService: MedicamentoService,
    private readonly messageService: MessageService
  ) {}

  /** Abre el modal */
  public showDialog(med?: IMedicamento): boolean {
    this.medicamentoActual = med ? { ...med } : null;
    this.medicamento = med ? { ...med } : this.getMedicamentoVacio();
    return (this.display = true);
  }

  /** Cierra el modal y limpia */
  public hideDialog(form?: any): boolean {
    this.resetFormulario();
    if (form) {
      form.resetForm();
    }
    return (this.display = false);
  }


  /** Guardar o actualiza un medicamento */
  public guardarMedicamento(form: any): void {
  if (!this.validarFormulario()) return;

  const accion = this.medicamentoActual ? 'actualizado' : 'registrado';
  const severidad = this.medicamentoActual ? 'info' : 'success';

  this.medicamentoService.agregarMedicamento(this.medicamento).subscribe({
      next: () => {
        this.hideDialog(form);
        this.showToast(severidad, 'Éxito', `Medicamento ${accion} correctamente`);
        this.medicamentoAgregado.emit();
      },
      error: () => {
        this.showToast('error', 'Error', 'No se pudo procesar el medicamento');
      },
    });
  }



  /** ---- Utiles ---- */
  private validarFormulario(): boolean {
    // Fechas
    if (new Date(this.medicamento.fechaFabricacion) >= new Date(this.medicamento.fechaVencimiento)) {
      this.showToast('error', 'Fechas inválidas', 'La fecha de fabricación debe ser menor a la de vencimiento');
      return false;
    }

    // Valores positivos
    if (this.medicamento.cantidadStock < 0 || this.medicamento.valorUnitario <= 0) {
      this.showToast('error', 'Valores inválidos', 'La cantidad no puede ser negativa y el valor unitario debe ser mayor a 0');
      return false;
    }


    return true;
  }

  private resetFormulario(): void {
    this.medicamento = this.getMedicamentoVacio();
  }

  private getMedicamentoVacio(): IMedicamento {
    return {
      nombre: '',
      laboratorio: '',
      fechaFabricacion: '',
      fechaVencimiento: '',
      cantidadStock: 0,
      valorUnitario: 0,
    };
  }

  private showToast(severity: string, summary: string, detail: string, life = 3000): void {
    this.messageService.add({ severity, summary, detail, life });
  }
}
