import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './interceptors/loading.interceptor';
registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'eams-44eb1',
          appId: '1:721322599066:web:fd450c41edda8c00173523',
          storageBucket: 'eams-44eb1.appspot.com',
          apiKey: 'AIzaSyDixjT5vXMlHo4mCZs65cn2eAEfHFfvjHg',
          authDomain: 'eams-44eb1.firebaseapp.com',
          messagingSenderId: '721322599066',
          measurementId: 'G-GKD6TSKQ2X',
        })
      )
    ),
    provideToastr(),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideMessaging(() => getMessaging())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
  ],
};
