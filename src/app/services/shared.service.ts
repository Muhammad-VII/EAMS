import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap, timeout, throwError } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  $theme: BehaviorSubject<boolean> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('theme')!)
  );
  profileInfo: BehaviorSubject<any> = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('profileInfo')!)
  );
  startMenuButtons: BehaviorSubject<any> = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('startMenu')!)
  );
  desktopGroups: BehaviorSubject<any> = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('desktopGroups')!)
  );
  desktopIcons: BehaviorSubject<any> = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('desktopIcons')!)
  );
  constructor(
    public _SpinnerService: NgxSpinnerService,
    private _HttpClient: HttpClient,
    public _Router: Router,
    public _Toaster: ToastrService
  ) {
    this.$theme.subscribe((theme) => {
      if (theme == true) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    });
  }

  addTicketSupport(ticketSupportForm: any): Observable<any> {
    return this._HttpClient
      .post(`${environments.API_URL}/AddTicketSupport`, ticketSupportForm)
      .pipe(
        tap((res) => {
          if (res == 200) {
            this._SpinnerService.hide();
            this._Toaster.success('Message recevied successfully');
          } else {
            this._Toaster.error('Message not recevied');
          }
        }),
        timeout({
          each: 60000,
          with: () =>
            throwError(() => {
              this._Toaster.error('Server connection Timeout');
              this._SpinnerService.hide();
            }),
        })
      );
  }
}
