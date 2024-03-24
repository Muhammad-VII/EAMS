import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DialogApisService } from '../../../services/dialog-apis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DialogHeaderComponent } from '../../../components/shared/dialog-header/dialog-header.component';

@Component({
  selector: 'app-component-control',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    NgIf,
    NgFor,
    NzTableModule,
    NzDropDownModule,
    NzImageModule,
    DialogHeaderComponent
  ],
  templateUrl: './component-control.component.html',
  styleUrl: './component-control.component.scss',
})
export class ComponentControlComponent {
  headerContent = {
    title: 'Components',
    name: 'component-control',
    icon: 'addComponent',
    infoLink: 'https://www.google.com',
    btns: [
      {
        title: 'Add',
        icon: 'add',
        folderName: 'default',
        targetComponent: 'AddComponent',
      },
      {
        title: 'Report',
        icon: 'report',
        folderName: 'default',
        targetComponent: 'AddComponent',
      },
    ],
  };
  showWindow: boolean = false;
  arr: never[] = [];
  btnsPermision: any;
  showAdd = new BehaviorSubject(false);
  showReport = new BehaviorSubject(false);
  content: any;
  listOfData: any[] = [];
  cashedData: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ComponentControlComponent>,
    private _DialogApiSevice: DialogApisService,
    @Inject(MAT_DIALOG_DATA) public buttonsAvalible: any[]
  ) {}

  total: number = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' },
  ];

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this._DialogApiSevice
      .getComponents(pageSize, pageIndex)
      .subscribe((data: any) => {
        this.loading = false;
        this.total = data[0].TotalRowCount;
        this.listOfData = data[0].Details;
        this.cashedData = data[0].Details;
      });
  }

  searchValue = '';
  visible = false;

  search(): void {
    this.visible = false;
    const newArr = this.listOfData.filter(
      (item: any) => item.Title == this.searchValue
    );
    this.listOfData = newArr;
  }

  reset(): void {
    this.searchValue = '';
    this.listOfData = this.cashedData;
    this.visible = false;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    const take = (pageIndex - 1) * pageSize;
    this.loadDataFromServer(take, pageSize, sortField, sortOrder, filter);
  }

  openAddDialog(): void {
    // this._Dialog.open(AddCompComponent, {
    //   hasBackdrop: false,
    // });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  minimize(e: any) {
    $(e.path[4]).fadeOut(300);
  }

  ngOnInit(): void {}
}
