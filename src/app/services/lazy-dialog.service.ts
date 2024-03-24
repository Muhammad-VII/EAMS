import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PlatformComponents } from './components.keys';
@Injectable({
  providedIn: 'root',
})
export class LazyDialogService {
  constructor(private dialog: MatDialog) {}
  taps: any[] = [];
  taskbarTaps: BehaviorSubject<
    { name: string; title: string; id: string; folderName: string }[]
  > = new BehaviorSubject<
    { name: string; title: string; id: string; folderName: string }[]
  >([]);

  openDialog(
    dialogName: string,
    folderName?: string,
    title?: string
  ): void {
    this.taps.push({ id: dialogName, title, name: dialogName, folderName });
    this.taskbarTaps.next(this.taps);
    const apps = PlatformComponents;
    for(const [key, value] of Object.entries(apps)) {
      if(key === dialogName) {
        this.dialog.open(value as ComponentType<unknown>, {
          hasBackdrop: false,
          id: dialogName,
        });
      }
    }
  }

  closeDialogFromTaskbar(dialogName: string): void {
    this.taps.findIndex((tap, index) => {
      if (tap?.name === dialogName) {
        this.taps.splice(index, 1);
      }
    });
    this.taskbarTaps.next(this.taps);
  }

  closeAllDialogs(): void {
    this.dialog.closeAll();
  }

  minimizeDialog(dialogName: string): void {
    //hiding dialog using jquery
    $(`#${dialogName}`).hide();
  }

  maximizeDialog(dialogName: string): void {
    //showing dialog using jquery
    $(`#${dialogName}`).show();
  }
}
