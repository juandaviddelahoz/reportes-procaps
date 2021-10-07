import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {

    // Formato DD/MM/AAA

    let date = new Date()

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let formato = ``;

    // Asigna 0 delante del numero del mes dependiendo si es menor a 10

    if(day < 10 && month < 10 ){
      formato = `0${day}-0${month}-${year}`;
    } else if (day < 10) {
      formato = `0${day}-${month}-${year}`;
    }
    else if(month < 10 ){
      formato = `${day}-0${month}-${year}`;
    } else{
      formato = `${day}-${month}-${year}`;
    }

    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + ' ' + formato + EXCEL_EXTENSION);
     
  }
}
