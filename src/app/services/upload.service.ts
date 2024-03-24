import { Injectable, inject } from '@angular/core';
import { ref, uploadBytes, getDownloadURL, Storage } from '@angular/fire/storage';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private _Storage: Storage = inject(Storage);

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this._Storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
