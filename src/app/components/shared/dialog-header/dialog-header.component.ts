import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyDialogService } from '../../../services/lazy-dialog.service';
interface buttonModel {
  title: string;
  icon: string;
  folderName: string;
  targetComponent: string;
}
@Component({
  selector: 'app-dialog-header',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {
  @Input() dialogRef: any;
  @Input() props!: {
    title: string;
    name: string;
    icon: string;
    infoLink: string;
    btns: buttonModel[];
  };
  constructor(public lazyDialogService: LazyDialogService) {
    
  }

  ngOnInit(): void {}

  minimize(e: any) {
    this.lazyDialogService.minimizeDialog(e)
  }

  close(e:any) {
    this.dialogRef.close();
    this.lazyDialogService.closeDialogFromTaskbar(e)
  }
}
