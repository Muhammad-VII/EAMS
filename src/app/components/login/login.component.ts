import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { SharedModule } from '../../../shared.module';
import DeviceUUID from 'device-uuid';
import { ToastService } from '../../services/toast.service';
import { catchError, mergeMap } from 'rxjs';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, SharedModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  Email!: string;
  Plattform!: string;
  Uid!: string;
  Password!: string;
  hide = true;
  value = '';
  private _AuthService: AuthService = inject(AuthService);
  private _ToastService: ToastService = inject(ToastService);
  private _TokenService: JwtService = inject(JwtService);
  private _Router: Router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitLoginForm(): void {
    if (!this.loginForm.valid) {
      this._ToastService.warn('Please fill in all fields correctly!');
    } else {
      this._AuthService
        .loginWithEmailHandler(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .pipe(
          mergeMap((res) => {
            const newModel = {
              token:
                '34959adcd87f445689dbe71e3c34bdd277c2542bb92f4c2c81a83a18642b8799',
              uid: res.user.uid,
              email: this.loginForm.value.email,
              macAd: new DeviceUUID.DeviceUUID().get(),
            };
            return this._AuthService.getLoginInfo(newModel);
          }),
          catchError((err) => {
            return err;
          })
        )
        .subscribe({
          next: (res) => {
            this._TokenService.saveToken(JSON.stringify(res.jwtInfo));
            localStorage.setItem('profileInfo', JSON.stringify(res.profileInfo));
            localStorage.setItem('theme', JSON.stringify(res.profileInfo.darkMode));
            localStorage.setItem('desktopIcons', JSON.stringify(res.desktopIcons));
            localStorage.setItem('desktopGroups', JSON.stringify(res.desktopGroups));
            localStorage.setItem('startMenu', JSON.stringify(res.startMenu));
            this._ToastService.success('Successfully logged in!');
            this._Router.navigate(['/desktop']);
          },
          error: (err) => {
            this._ToastService.error(
              'Wrong email or password Please try again!'
            );
          },
        });
    }
  }
}
