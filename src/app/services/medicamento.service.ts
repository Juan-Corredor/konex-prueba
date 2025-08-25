import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMedicamento } from '../models/medicamento.model';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private readonly API_URL: string = '/api/medicamentos'; // proxy

  constructor(private readonly http: HttpClient) {}

  // Traer lista de medicamentos (GET)
  public getMedicamentos(): Observable<IMedicamento[]> {
    return this.http.get<IMedicamento[]>(this.API_URL);
  }

  // Agregar un medicamento (POST)
  public agregarMedicamento(med: IMedicamento): Observable<IMedicamento> {
    return this.http.post<IMedicamento>(this.API_URL, med);
  }

  // Actualizar un medicamento existente (PUT)
  public actualizarMedicamento(
    id: number,
    med: IMedicamento
  ): Observable<IMedicamento> {
    return this.http.put<IMedicamento>(`${this.API_URL}/${id}`, med);
  }

  // Eliminar un medicamento (DELETE)
  public eliminarMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
