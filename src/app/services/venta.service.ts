import { IVenta } from './../models/venta.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private readonly API_URL: string = '/api/venta'; // proxy

  constructor(private readonly http: HttpClient) {}

  getVentas(): Observable<IVenta[]> {
    return this.http.get<IVenta[]>(this.API_URL);
  }

  public registrarVenta(venta: IVenta): Observable<IVenta> {
  const params = new HttpParams()
    .set('medicamentoId', venta.medicamentoId.toString())
    .set('cantidad', venta.cantidad.toString());

  return this.http.post<IVenta>(this.API_URL, null, { params });
}
}
