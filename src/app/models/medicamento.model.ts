export interface IMedicamento {
  id?: number;
  nombre: string;
  laboratorio: string;
  fechaFabricacion: string;
  fechaVencimiento: string;
  cantidadStock: number;
  valorUnitario: number;
}
