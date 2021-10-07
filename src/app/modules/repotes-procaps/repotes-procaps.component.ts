import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listDataCliente } from './interfaces/listDataCliente';
import { Reporte } from './models/reporte.model';
import { ExcelService } from './services/excel.service';
import { ReportesProcapsService } from './services/reportes-procaps.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertFechainimayorComponent } from '../alert/alert-fechainimayor/alert-fechainimayor.component';
import { AlertNoregistrosComponent } from '../alert/alert-noregistros/alert-noregistros.component';

interface ListCodClientes {
  idCodCliete: string;
  name: string;
}

// Formato Datepicker input
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-repotes-procaps',
  templateUrl: './repotes-procaps.component.html',
  styleUrls: ['./repotes-procaps.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class RepotesProcapsComponent implements OnInit {

 // @ViewChild('userName') userName: ElementRef;

  // Arreglo que exporta a excel
  listClientesExcel: any[] = [];

  // Animacion de carga
  mostrarCarga = false;

  // Select Material
  disableSelect = new FormControl(false);

  // clienteControl = new FormControl('', [Validators.required]);

  listCodClientes: ListCodClientes[] = [
    { idCodCliete: '16970', name: 'Procaps' },
    { idCodCliete: '38452', name: 'Diabetrics' },
    { idCodCliete: '16906', name: 'CI Procaps' },
  ];

  // Formato Datepicker

  formatFechaI: string = '';
  formatFechaF: string = '';

  formatFechaInicio(fi: string) {
    this.formatFechaI = fi;
  }

  formatFechaFin(ff: string) {
    this.formatFechaF = ff
  }

  horaInicio: string = ' 00:00:00';
  horaFin: string = ' 23:59:59';

  btnDisabled = false;

  btnExportDisabled = true;

  displayedColumns: string[] = ['documentnumber', 'agencia', 'aerolinea', 'tipoServicio', 'amadeusValidationValue', 'nombre_Pax', 'itinerario', 'no_Factura'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  columnas = [
    /*El name aca es el que trae los datos*/
    { titulo: "Numero Documento", name: "documentnumber" },
    { titulo: "Agencia", name: "agencia" },
    { titulo: "Aerolinea", name: "aerolinea" },
    { titulo: "Tipo Servicio", name: "tipoServicio" },
    { titulo: "Amadeus", name: "amadeusValidationValue" },
    { titulo: "Nombre", name: "nombre_Pax" },
    { titulo: "Itinerario", name: "itinerario" },
    { titulo: "Numero Factura", name: "no_Factura" },
  ]

  formReporte: FormGroup = this.fb.group({});

  // Validación Fecha actual
  validFecha = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(private fb: FormBuilder,
    private _reportesprocapsServices: ReportesProcapsService,
    private _excelService: ExcelService,
    private dialogRef: MatDialog) {

  }

  // Alert Fecha Inicio Mayor
  openDialogFechaIniMayor() {
    this.dialogRef.open(AlertFechainimayorComponent);
  }

  // Alert No Registros
  openDialogNoRegistros() {
    this.dialogRef.open(AlertNoregistrosComponent);
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 0, this.validFecha.getMonth(), this.validFecha.getDate());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  iniciarFormulario() {
    this.formReporte = this.fb.group({
      codigoCliente: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    })
  }

  exportAsXLSX(): void {
    this._excelService.exportAsExcelFile(this.listClientesExcel, 'Reporte_Procaps');
  }

  enviarDatosConsulta() {
    // llamada a prueba de validacion de fecha
    if (this.formReporte.get('fechaInicio')?.value > this.formReporte.get('fechaFin')?.value) {
      this.openDialogFechaIniMayor();

    } else {

      console.log(this.formReporte.value);
      this.mostrarCarga = true;
      this.btnDisabled = true;
      this.btnExportDisabled = true;

      //Captura los datos del formulario
      const datosConsulta: Reporte = {
        codCliente: this.formReporte.get('codigoCliente')?.value,
        fechaIni: this.formatFechaI + this.horaInicio,
        fechaFin: this.formatFechaF + this.horaFin,
      }

      // Consulta servicio
      this._reportesprocapsServices.getListClientes(datosConsulta, 'consulta').subscribe(data => {
        if (data.length === 0) {
          this.openDialogNoRegistros();
          this.btnExportDisabled = true;
        } else {
          console.log(data.length);
          //this.listClientes = data;
          this.listClientesExcel = data;
          
          this.dataSource.data = data;
          // this.iniciarFormulario();
          this.btnExportDisabled = false;
        }
        this.btnDisabled = false;
        this.mostrarCarga = false;

      }, error => {
        console.log(error);
      })
    }
  }
}
