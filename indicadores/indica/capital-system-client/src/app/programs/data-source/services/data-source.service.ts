import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSource } from '../models/data-source';
import { UtilService } from 'src/app/shared/utils/util.service.component';

@Injectable()
export class DataSourceService{

    private _url:string = "http://localhost:5000/api/v1/filebases";
    private _urlGet:string = "http://localhost:5000/api/v1/filebases";

    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    constructor(private http: HttpClient,
                private utilsService: UtilService) { }
    
    public getAllFiles(): Observable<any>{

      return this.http.get<DataSource[]>(this._urlGet);
    }

    public getObjectByFilter(searchObject?:any,pageNumber?:Number,pageSize?:Number): Observable<any> {
        let params = [];
        let url: string = this._url;
        if(searchObject != null)
          Object.keys(searchObject).forEach((key) => params.push(key + '=' + encodeURIComponent(searchObject[key])));
        if (pageNumber != null)
          params.push('page=' + pageNumber.toString());
        if (pageSize != null)
          params.push('pageSize=' + pageSize.toString());
        if (params.length > 0)
          url = url + '?' + params.join('&');
        return this.http.get<DataSource[]>(url);
      }

      public getDataSourceById(dataSource: DataSource): Observable<DataSource> {
        let url = this.utilsService.generateUrlPrimaryKeys(dataSource, this._url);
        return this.http.get<DataSource>(url);
      }

      public remove(dataSource:DataSource): Observable<any> {
        let url = this.utilsService.generateUrlPrimaryKeys(dataSource, this._url);
        return this.http.delete<DataSource>(url);
      }

      public save(dataSource: any, isNew:Boolean):Observable<any> {
      
        let url: string = this._url;
        if(isNew) {
          return this.http.post<any>(url, dataSource, this.httpOptions);
        }
        else {
          url = this.utilsService.generateUrlPrimaryKeys(dataSource, url);
          return this.http.put<any>(url, dataSource, this.httpOptions);
        }
      }

      public integration(dataSource: any):Observable<any> {
        let url: string = this._url;
        return this.http.post<any>(url + '/integration', dataSource, this.httpOptions);
      }

      public integrationTeste(dataSource: any):Observable<any> {
        let url: string = this._url;
        return this.http.post<any[]>(url + '/integration', dataSource, this.httpOptions);
      }
}
