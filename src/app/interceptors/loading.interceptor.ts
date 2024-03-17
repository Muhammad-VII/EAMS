import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService: NgxSpinnerService = inject(NgxSpinnerService);
  // Start loading indicator
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Stop loading indicator, whether the request succeeds or fails
      loadingService.hide();
    })
  );
};
