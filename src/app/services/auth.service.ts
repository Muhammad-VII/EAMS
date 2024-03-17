import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  Storage,
} from '@angular/fire/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  from,
  switchMap,
  BehaviorSubject,
  Subscription,
  tap,
  timeout,
  throwError,
} from 'rxjs';
import { environments } from '../../environments/environments';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _Toaster: ToastrService = inject(ToastrService);
  constructor(
    private _HttpClient: HttpClient,
    private firebaseAuth: Auth,
    private _Router: Router,
    private storage: Storage
  ) {}

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }

  deviceId = 'Device id';
  currentUser: BehaviorSubject<string> = new BehaviorSubject('');
  lockState: BehaviorSubject<boolean> = new BehaviorSubject(true);
  subscribtion: Subscription[] = [];
  getLogInfoForm: FormGroup = new FormGroup<{
    token: FormControl<string>;
    uid: FormControl<string | null>;
    email: FormControl<string | null>;
    componentId: FormControl<string>;
    fireToken: FormControl<string | null>;
    macAd: FormControl<string>;
  }>({
    token: new FormControl(
      '34959adcd87f445689dbe71e3c34bdd277c2542bb92f4c2c81a83a18642b8799',
      { nonNullable: true }
    ),
    uid: new FormControl(null),
    email: new FormControl(null),
    componentId: new FormControl('F4F97A18-D8AB-40E5-996E-114696F798C7', {
      nonNullable: true,
    }),
    fireToken: new FormControl(null),
    macAd: new FormControl(this.deviceId, { nonNullable: true }),
  });

  async loginWithEmailHandler(loginForm: any) {
    try {
      const loginHandler = await signInWithEmailAndPassword(
        this.firebaseAuth,
        loginForm.value.Email,
        loginForm.value.Password
      );
      this.getLogInfoForm.controls['uid'].setValue(loginHandler.user.uid);
      this.getLogInfoForm.controls['email'].setValue(loginHandler.user.email);
      this.getLogInfoForm.controls['fireToken'].setValue(
        loginHandler.user.refreshToken
      );
      this.getLogInfo().subscribe({
        next: (data) => {
          if (!data) {
            this._Toaster.error('Login faild');
          } else {
            localStorage.setItem(
              'desktopGroups',
              JSON.stringify(data?.desktopGroups)
            );
            localStorage.setItem(
              'desktopIcons',
              JSON.stringify(data?.desktopIcons)
            );
            localStorage.setItem(
              'profileInfo',
              JSON.stringify(data?.profileInfo)
            );
            localStorage.setItem(
              'theme',
              JSON.stringify(data?.profileInfo?.darkMode)
            );
            localStorage.setItem('startMenu', JSON.stringify(data?.startMenu));
            this.currentUser.next(data?.jwtInfo);
            this._Router.navigate(['/']);
          }
        },
        error: () => {},
      });
    } catch (error) {
      this._Toaster.error('Credentials are wrong');
    }
  }

  getLogInfo(): Observable<any> {
    return this._HttpClient
      .post(`${environments.API_URL}/GetLoginInfo`, this.getLogInfoForm.value)
      .pipe(
        timeout({
          each: 60000,
          with: () =>
            throwError(() => {
              this._Toaster.error('Server connection Timeout');
            }),
        })
      );
  }
}
