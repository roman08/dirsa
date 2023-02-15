import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as _ from 'lodash';
import { AgentsService } from 'src/app/services/agents.service';
import swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css'],
})
export class LoadFileComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  progress: number = 0;
  progressTotal: number = 0;
  dataString: string | undefined;
  constructor(
    private _srvAgents: AgentsService,
    private formBuilder: FormBuilder
  ) {
    let decimalTimeString = '6.498539722';
    let decimalTime = parseFloat(decimalTimeString);
    decimalTime = decimalTime * 60 * 60;
    let hours = Math.floor(decimalTime / (60 * 60));
    decimalTime = decimalTime - hours * 60 * 60;
    let minutes = Math.floor(decimalTime / 60);
    decimalTime = decimalTime - minutes * 60;
    let seconds = Math.round(decimalTime);
    if (hours < 10) {
      let hoursf = '0' + hours;
    }
    if (minutes < 10) {
      let minutesf = '0' + minutes;
    }
    if (seconds < 10) {
      let secondsf = '0' + seconds;
    }

    const f = hours + ':' + minutes + ':' + seconds;

    console.log(f);
  }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: [''],
      fuente: [1],
    });
  }

  onFileSelect(ev: any) {
    // let af = [
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   'application/vnd.ms-excel',
    // ];
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   // console.log(file);

    //   if (!_.includes(af, file.type)) {
    //     alert('Only EXCEL Docs Allowed!');
    //   } else {
    //     this.fileInputLabel = file.name;
    //     this.fileUploadForm?.controls['myfile'].setValue(file);
    //   }
    // }

    console.log(ev.target);
    
    let workBook: XLSX.WorkBook;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataString = JSON.stringify(jsonData);
      console.log('load');
      
      
    };
    reader.readAsBinaryString(file);
  }

  onFormSubmit(): boolean {
    // if (!this.fileUploadForm.controls['myfile'].value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    const fuente = this.fileUploadForm.controls['fuente'].value;

    const formData = new FormData();

    formData.append(
      'uploaded_file',
      this.fileUploadForm.controls['myfile'].value
    );

    const body = {
      data: this.dataString,
      user_id: 1,
      tipo_fuente: fuente,
    };

    // let payload = JSON.stringify({
    //   user_id: 1,
    //   tipo_fuente: fuente,
    // });
    // formData.append('payload', payload);

    this._srvAgents.upload(body).subscribe((event: HttpEvent<any>) => {
      console.log(event);

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
}
