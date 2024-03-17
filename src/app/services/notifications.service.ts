import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NotificationModel } from '../models/notification-model';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  subscriptions: Subscription[] = [];
  message = new BehaviorSubject(null);
  notificationReceived = new BehaviorSubject(false);
  notification$: BehaviorSubject<NotificationModel> =
    new BehaviorSubject<NotificationModel>({ title: ' ', body: ' ' });
  constructor(
    private afMessaging: AngularFireMessaging,
    private _snackBar: MatSnackBar,
  ) {
    this.subscriptions.push(
      this.afMessaging.requestToken.subscribe((token) => {
        sessionStorage.setItem('fcm-token', JSON.stringify(token));
        this.afMessaging.messages.subscribe((message: any) => {
          this.message.next(message.notification);
          this.notificationReceived.next(true);
          this.setNotification({
            body: message.notification.body,
            title: message.notification.title,
          });
        });
      })
    );
  }

  openSnackBar(notification: string, splash: string) {
    this._snackBar.open(notification, splash, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  setNotification(notification: NotificationModel) {
    this.notification$.next(notification);
    this.openSnackBar(notification.body, notification.title)
  }

  getNotification() {
    return this.notification$.asObservable();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
