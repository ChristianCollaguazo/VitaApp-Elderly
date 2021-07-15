import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Auth } from 'src/app/controller/interfaces/carer.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private vitaapp: VitaappService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initalizeForm();
  }

  initalizeForm(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logIn(): void {
    this.formLogin
      .get('password')
      .setValue(this.formLogin.get('username').value);
    if (this.formLogin.valid) {
      const auth: Auth = {
        username: this.formLogin.get('username').value,
        password: this.formLogin.get('password').value,
      };

      this.vitaapp.loginElderly(auth).subscribe(
        (resp) => {
          this.authService.setSession(resp.jwt);
          // * Redirecciono al main en caso de que la informacion de registro sea correcta
          this.router.navigateByUrl('/categorias');
        },
        (err) => {
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Nombre de usuario incorrecto, ej: usuarioprueba',
          };
          this.showMessage(msg);
        }
      );
    } else {
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail: 'Revise el formulario.',
      };
      this.showMessage(msg);
      this.validateForm();
    }
  }

  get invalidUsername(): boolean {
    return (
      this.formLogin.get('username').invalid &&
      this.formLogin.get('username').touched
    );
  }

  validateForm() {
    if (this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastLogin',
      ...msg,
    });
  }
}
