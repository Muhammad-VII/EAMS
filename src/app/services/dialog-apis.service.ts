import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DialogApisService {

  
  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) { }

  getComponents(take: number = 10, skip: number = 0): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/GetAllComponent`, {
      componentId: `81f4b101-76eb-43b5-aef4-385a54dcd4d3`,
      langId: 1,
      take:take,
      skip:skip
    }, {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }

  getAddComponenetInfo(): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/GetAddComponentInfo?lang=1`, {}, {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }

  addNewComponenet(addComponentModel: any): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/AddNewComponent`, addComponentModel,
    {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }

  addNewWidget(addWidgetModel: any): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/AddNewWidgets`, addWidgetModel,
    {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }

  getUsers(take: number = 10, skip: number = 0): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/GetUsers`, {
      componentId: `38F303D7-96AC-4492-A964-3CD0111709BB`,
      sqlId: "f0d95a46-37c6-4019-9187-6b0129566888",
      // sqlId: JSON.parse(localStorage.getItem('user')!).userId,
      langId: 1,
      take:take,
      skip:skip
    }, {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }

  getWidgets(take: number = 10, skip: number = 0): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/GetAllWidgets`, {
      componentId: `5030076A-554F-4484-9D98-B71FBC44CF6F`,
      langId: 1,
      take:take,
      skip:skip
    }, {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }

  getAccountInfo(): Observable<any> {
    return this._HttpClient.post(`${environments.API_URL}/GetAllWidgets`, {
      componentId: `5030076A-554F-4484-9D98-B71FBC44CF6F`,
      userId: ""
    }, {
      headers: {
        Authorization: `Bearer ${this._AuthService.currentUser.getValue()}`
      }
    })
  }
}
