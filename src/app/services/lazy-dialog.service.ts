import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
declare let $: any;
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

  async openDialog(
    dialogName: string,
    folderName?: string,
    title?: string
  ): Promise<MatDialogRef<any>> {
    this.taps.push({ id: dialogName, title, name: dialogName, folderName });
    this.taskbarTaps.next(this.taps);
    const chunk = await import(
      `../dialogs/${folderName?.toLowerCase()}/${dialogName.toLowerCase()}/${dialogName.toLowerCase()}.component`
    );
    const dialogComponenet = Object.values(chunk)[0] as ComponentType<unknown>;
    return this.dialog.open(dialogComponenet, {
      hasBackdrop: false,
      id: dialogName,
    });
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
