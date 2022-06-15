import { Injectable } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Department} from "../data-model/department";
import {ArtObject} from "../data-model/art-object";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArtMuseumService {

  apiURL: string = "https://collectionapi.metmuseum.org/public/collection/v1";

  constructor(public http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<any>(`${this.apiURL}/departments`).pipe(
      map(res => res['departments'])
    );
  }

  getObjectIdsByDepartment(departmentId:string):Observable<any>  {
    const params = new HttpParams().set('departmentIds', departmentId.toString());
    return this.http.get<any>(`${this.apiURL}/objects`,{params});
  }

  getArtObject(objectId:number):Observable<ArtObject>  {
    return this.http.get<ArtObject>(`${this.apiURL}/objects/${objectId}`);
  }
  getArtObjects(objectIds:number[]):Observable<any>  {
    const artObjectAPIS = objectIds.map(objectId => {
      return this.http.get<ArtObject>(`${this.apiURL}/objects/${objectId}`);
    })
    return forkJoin(...artObjectAPIS);
  }

}
