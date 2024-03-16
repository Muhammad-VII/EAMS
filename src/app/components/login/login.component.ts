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
  constructor(
    private _AuthService: AuthService,
    private deviceInformationService: DeviceDetectorService
  ) {
    console.log(location.hostname);
    console.log('DeviceId');
    console.log('-------------------------------');
    console.log('Id : ' + Guid.create());
    console.log('Time : ' + Math.floor(Date.now() / 1000));
    console.log('Mobile  : ' + this.deviceInformationService.isMobile()); // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log('Tablet  : ' + this.deviceInformationService.isTablet()); // returns if the device is a tablet (tablet iPad etc)
    console.log('Desktop  : ' + this.deviceInformationService.isDesktop()); // returns if the app is running on a Desktop browser.
    console.log('DeviceType  : ' + this.deviceInformationService.deviceType); // returns if the app is running on a Desktop browser.
    console.log('os  : ' + this.deviceInformationService.getDeviceInfo().os); // returns os name like Windows/Andtoid/iOS/Linux/Mac OS X etc
    console.log('osVersion  : ' + this.deviceInformationService.os_version); // returns os version like 10/8.1/7 ...etc
    console.log(
      'browser  : ' + this.deviceInformationService.getDeviceInfo().browser
    ); // returns browser name like chrome/firefox ...etc
    console.log(
      'creen_resolution  : ' +
        this.deviceInformationService.getDeviceInfo().orientation
    ); // returns screnn size like 1390x860/640x800 ...etc
    // returns userAgent
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
  Email!: string;
  Plattform!: string;
  Uid!: string;
  Password!: string;
  hide = true;
  value = '';
  ngOnInit(): void {}

  signIn(loginForm: FormGroup): void {
    this._AuthService.loginWithEmailHandler(loginForm);
  }
}
