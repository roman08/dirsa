import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private _srvAuth: AuthService,
    private _srvStorage: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}


  login() {
    const usuario = this.loginForm.value['usuario'];
    const password = this.loginForm.value['password'];

    this._srvAuth.login(usuario, password).subscribe((respuesta) => {
      if (respuesta.status === 'success') {
        const role = respuesta['data']['role']['nombre'];
        this._srvStorage.set('token', respuesta['access_token']);
        this._srvStorage.set('role', role);
        this._srvStorage.set('user_id', respuesta['data']['id']);
        this._srvStorage.set('user_name', respuesta['data']['nombre_completo']);

        if (role == 'Administrador'){
          this.router.navigateByUrl('/dashboard/dashboard-admin');
        } else{
          this.router.navigateByUrl('/dashboard');
        }
      } else {
        swal.fire('Alerta', respuesta.message, 'error');
      }
    });
  }

  get usuario() {
    return this.loginForm.get('usuario');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
