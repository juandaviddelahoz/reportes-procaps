import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesProcapsService {
  private apiUrl = 'consulta/';

  constructor(private http: HttpClient) { }

  getListClientes(datosConsulta: Reporte, api: any): Observable<any> {
    return this.http.get(environment.appUrl + api + "?codCliente="+datosConsulta.codCliente+"&fechaIni="+datosConsulta.fechaIni+"&fechaFin="+datosConsulta.fechaFin+"");
  }
}
