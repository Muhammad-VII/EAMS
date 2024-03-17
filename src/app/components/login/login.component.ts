import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Guid } from 'guid-typescript';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { SharedModule } from '../../../shared.module';

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
  constructor(
    private _AuthService: AuthService,
  ) {
  }
  loginForm: FormGroup = new FormGroup<{
    Email: FormControl<string | null>;
    Password: FormControl<string | null>;
  }>({
    Email: new FormControl('Guest@emojiit.com', [
      Validators.required,
      Validators.email,
    ]),
    Password: new FormControl('emojiit123*#@', [Validators.required]),
  });


  signIn(loginForm: FormGroup): void {
    this._AuthService.loginWithEmailHandler(loginForm);
  }
}
