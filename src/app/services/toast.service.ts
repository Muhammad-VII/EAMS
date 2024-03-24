import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _ToastService: ToastrService = inject(ToastrService);

  public success(message: string) {
    this._ToastService.success(message);
  }

  public error(message: string) {
    this._ToastService.error(message);
  }

  public info(message: string) {
    this._ToastService.info(message);
  }

  public warn(message: string) {
    this._ToastService.warning(message);
  }

}
