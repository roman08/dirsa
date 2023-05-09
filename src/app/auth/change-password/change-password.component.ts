import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changeForm: FormGroup;

  constructor(
    private _srvAuth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.changeForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  sendEmail() {
    const email = this.changeForm.value['email'];
    this._srvAuth.sendEmail(email).subscribe((respuesta) => {
      if (respuesta.status === 'success') {
        swal.fire('Do It Right', respuesta.msg, 'success');
        this.router.navigateByUrl('/login');
      } else {
        swal.fire('Do It Right', respuesta.msg, 'error');
      }
    });
  }

  get email() {
    return this.changeForm.get('email');
  }
}
