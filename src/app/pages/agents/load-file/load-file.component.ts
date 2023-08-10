import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as _ from 'lodash';
import { AgentsService } from 'src/app/services/agents.service';
import swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Campania } from 'src/app/models/campania.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css'],
})
export class LoadFileComponent implements OnInit {
  @ViewChild('donwload') donwload: any;
  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  progress: number = 0;
  progressTotal: number = 0;
  dataString: string | undefined;

  campanias: Campania[] = [];
  agentsDanger: any[] = [];
  id_type_origin: any;
  user_id: number = 0;
  fileUrl!: SafeResourceUrl;
  showBtnErrors: boolean = false;
  fileName: string | undefined;
  constructor(
    private _srvAgents: AgentsService,
    private formBuilder: FormBuilder,
    private _srvCampania: CampaniasService,
    private _srvStorage: StorageService,
    private sanitizer: DomSanitizer
  ) {
    this.id_type_origin = JSON.parse(this._srvStorage.get('id_type_origin'));
    this.user_id = JSON.parse(this._srvStorage.get('user_id'));
  }

  ngOnInit(): void {
    this.loadCampanias();
    this.fileUploadForm = this.formBuilder.group({
      myfile: [''],
      fuente: [1],
      day_register: [],
    });
  }

  loadCampanias() {
    this._srvCampania.getAgentCampanias().subscribe((res) => {
      this.campanias = res['data'];
    });
  }
  onFileSelect(ev: any) {
    let workBook: XLSX.WorkBook;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    this.fileName = file.name;
    console.log(this.fileName);
    
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataString = JSON.stringify(jsonData);
    };
    reader.readAsBinaryString(file);
  }

  donwloadFile() {}

  onFormSubmit(): boolean {
    // if (!this.fileUploadForm.controls['myfile'].value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    const fuente = this.fileUploadForm.controls['fuente'].value;
    const fecha = this.fileUploadForm.controls['day_register'].value;
    const formData = new FormData();

    formData.append(
      'uploaded_file',
      this.fileUploadForm.controls['myfile'].value
    );

    const body = {
      data: this.dataString,
      user_id: this.user_id,
      tipo_fuente: this.id_type_origin,
      id_campania: fuente,
      day_register: fecha,
    };

    // let payload = JSON.stringify({
    //   user_id: 1,
    //   tipo_fuente: fuente,
    // });
    // formData.append('payload', payload);

    this._srvAgents.upload(body).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progressTotal = 1;
          this.progress = Math.round((event.loaded / event.total!) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);

          if (event.body.status == 'success') {
            setTimeout(() => {
              if (event.body.userNoValid.length > 0) {
                this.showBtnErrors = true;
                //
                let json = event.body.userNoValid;

                // Convertir el JSON a objeto JavaScript
                let objetos = event.body.userNoValid;

                // Recorrer cada objeto y eliminar la propiedad deseada
                for (let i = 0; i < objetos.length; i++) {
                  delete objetos[i]['VWS'];
                  delete objetos[i]['System Hrs'];
                  delete objetos[i]['AFD'];
                  delete objetos[i]['System Hrs to Away from Desk %'];
                  delete objetos[i]['30 Minute Break'];
                  delete objetos[i]['System Hrs Formato HR'];
                  delete objetos[i]['AFD Formato HR'];
                  delete objetos[i]['30 Minute Break Formato HR'];
                  delete objetos[i]['Clicker Time Formato HR'];
                  delete objetos[i]['Program Training Formato HR'];
                  delete objetos[i]['Meeting-Supervisor Formato HR'];
                  delete objetos[i]['Meeting-Troubleshooting Formato HR'];
                }

                // Convertir el objeto de nuevo a JSON
                // let nuevoJSON = JSON.stringify(objetos);
                this.agentsDanger = event.body.userNoValid;

                console.log(this.agentsDanger);
                this.downloadFile(objetos);
                let data = JSON.stringify(this.agentsDanger);
                const blob = new Blob([data], { type: 'application/json' });
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                  window.URL.createObjectURL(blob)
                );

                console.log(this.fileUrl);
              }
              swal.fire('Do It Right', event.body.msg, 'success');
            }, 2000);
          } else {
            setTimeout(() => {
              this.progress = 0;
              swal.fire('Do It Right', event.body.msg, 'error');
            }, 1000);
          }
        // setTimeout(() => {
        //   this.progress = 0;
        // }, 1500);
      }
    });
    return true;
  }

  downloadFile(data:  any[], filename = 'data') {
    let csvData = this.ConvertToCSV(data, [
      'DisplayName',
      'No empleado'
    ]);
    console.log(csvData);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: string | any[], headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
