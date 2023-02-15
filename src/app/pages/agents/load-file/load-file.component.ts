import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as _ from 'lodash';
import { AgentsService } from 'src/app/services/agents.service';
import swal from 'sweetalert2';

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
  constructor(
    private _srvAgents: AgentsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: [''],
      fuente: [1]
    });
  }

  onFileSelect(event: any) {
    let af = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm?.controls['myfile'].setValue(file);
      }
    }
  }

  onFormSubmit(): boolean {
    if (!this.fileUploadForm.controls['myfile'].value) {
      alert('Please fill valid details!');
      return false;
    }
    
    const fuente = this.fileUploadForm.controls['fuente'].value;
    
    const formData = new FormData();
    
    formData.append(
      'uploaded_file',
      this.fileUploadForm.controls['myfile'].value
    );

    let payload = JSON.stringify({
      user_id: 1,
      tipo_fuente: fuente,
    });
    formData.append('payload', payload);

    this._srvAgents.upload(formData).subscribe((event: HttpEvent<any>) => {
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
          if( event.body.status == 'success'){
             setTimeout(() => {
               swal.fire('Do It Right', event.body.msg, 'success');
             }, 2000);
            
          }else{
            
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
