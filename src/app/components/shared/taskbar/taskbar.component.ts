import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Observable, from } from 'rxjs';
// import { AuthService } from '../../../services/auth.service';
import { LazyDialogService } from '../../../services/lazy-dialog.service';
import { SharedService } from '../../../services/shared.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [NgIf, AsyncPipe, DatePipe, RouterLink, MatMenuModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.scss',
})
export class TaskbarComponent {
  $profileInfo: Observable<any> = from(this._SharedService.profileInfo);
  $startMenuButtons: Observable<any> = from(
    this._SharedService.startMenuButtons
  );
  todayDate: Date = new Date();
  lockDevice(): void {
    // this._AuthService.lockState.next(false);
    this._Router.navigate(['/lock-screen']);
  }
  constructor(
    private _SharedService: SharedService,
    public lazyDialog: LazyDialogService,
    // private _AuthService: AuthService,
    private _Router: Router,
    private _MatDialog: MatDialog
  ) {}
  taskbarTaps = this.lazyDialog.taskbarTaps.asObservable();
  openfullscreen() {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {})
        .catch((err) => console.error(err));
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  changeTheme(): void {
    if (this._SharedService.$theme.getValue() == false) {
      this._SharedService.$theme.next(true);
      localStorage.setItem('theme', JSON.stringify(true));
      document.body.classList.replace('light-theme', 'dark-theme');
    } else {
      this._SharedService.$theme.next(false);
      localStorage.setItem('theme', JSON.stringify(false));
      document.body.classList.replace('dark-theme', 'light-theme');
    }
  }

  getTime() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hh = hours % 12 || 12;
    const mm = minutes < 10 ? '0' + minutes : minutes;
    return `${hh}:${mm} ${ampm}`;
  }

  timer() {
    return setInterval(() => {
      const timeElement: HTMLDivElement = document.querySelector(
        '.time'
      ) as HTMLDivElement;
      if (timeElement) {
        timeElement.innerHTML = this.getTime();
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.timer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer());
  }

  closeDialog(e: any): void {
    this._MatDialog.getDialogById(e)?.close();
    this.lazyDialog.closeDialogFromTaskbar(e);
  }

  maximize(e: any): void {
    this.lazyDialog.maximizeDialog(e);
  }
}
