import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/utils/util.service.component';
import { IndicatorsField } from '../models/indicators-field';

@Injectable()
export class IndicatorsFieldService{

    private _url:string = "http://localhost:5000/api/v1/indicatorsField";
    private _urlIndicators:string = "http://localhost:5000/api/v1/indicators";
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    constructor(private http: HttpClient,
                private utilsService: UtilService) { }

    public getObjectByFilter(searchObject?:any,baseId?:Number): Observable<any> {
        let params: string[] = [];
        let url: string = this._url;
        if(searchObject != null)
          Object.keys(searchObject).forEach((key) => params.push(key + '=' + encodeURIComponent(searchObject[key])));
        if (baseId != null)
          params.push('baseId=' + baseId.toString());
        if (params.length > 0)
          url = url + '?' + params.join('&');
        return this.http.get<IndicatorsField[]>(url);
      }

      public getIndicatorsFieldById(indicatorsField: IndicatorsField): Observable<IndicatorsField> {
        let url = this.utilsService.generateUrlPrimaryKeys(indicatorsField, this._url);
        return this.http.get<IndicatorsField>(url);
      }

      public remove(indicatorsField:IndicatorsField): Observable<any> {
        let url = this.utilsService.generateUrlPrimaryKeys(indicatorsField, this._url);
        return this.http.delete<IndicatorsField>(url);
      }

      public save(indicatorsField: any, isNew:Boolean):Observable<any> {
      
        let url: string = this._url;
        if(isNew) {
          return this.http.post<any>(url, indicatorsField, this.httpOptions);
        }
        else {
          url = this.utilsService.generateUrlPrimaryKeys(indicatorsField, url);
          return this.http.put<any>(url, indicatorsField, this.httpOptions);
        }
      }

}
