import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { LazyDialogService } from '../../services/lazy-dialog.service';
import { SharedService } from '../../services/shared.service';
import { TaskbarComponent } from '../shared/taskbar/taskbar.component';
import { AsyncPipe, LowerCasePipe, NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [TaskbarComponent, NgStyle, NgFor, AsyncPipe, LowerCasePipe],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
})
export class DesktopComponent {
  $desktopGroups: Observable<any> = from(this._SharedService.desktopGroups);
  $desktopIcons: Observable<any> = from(this._SharedService.desktopIcons);
  profileData: any = this._SharedService.profileInfo.getValue();

  constructor(
    private _SharedService: SharedService,
    public dialog: MatDialog,
    public lazyDialog: LazyDialogService
  ) {}

  ngOnInit(): void {}
}
