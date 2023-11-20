import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/utils/util.service.component';
import { FilterIndicatorsField } from '../models/filter-indicators-field';
import { CalculationField } from '../models/calculation-field';

@Injectable()
export class CalculationFieldService{

    private _url:string = "http://localhost:5000/api/v1/calculationField";
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    constructor(private http: HttpClient,
                private utilsService: UtilService) { }

    public getObjectByFilter(searchObject?:any,indicatorsFieldId?:Number): Observable<any> {
        let params: string[] = [];
        let url: string = this._url;
        if(searchObject != null)
          Object.keys(searchObject).forEach((key) => params.push(key + '=' + encodeURIComponent(searchObject[key])));
        if (indicatorsFieldId != null)
          params.push('indicators_field_id=' + indicatorsFieldId.toString());
        if (params.length > 0)
          url = url + '?' + params.join('&');
        return this.http.get<CalculationField[]>(url);
      }

      public remove(calculationField:CalculationField): Observable<any> {
        let url = this.utilsService.generateUrlPrimaryKeys(calculationField, this._url);
        return this.http.delete<CalculationField>(url);
      }

      public save(calculationField: any, isNew:Boolean):Observable<any> {
      
        let url: string = this._url;
        if(isNew) {
          return this.http.post<any>(url, calculationField, this.httpOptions);
        }
        else {
          url = this.utilsService.generateUrlPrimaryKeys(calculationField, url);
          return this.http.put<any>(url, calculationField, this.httpOptions);
        }
      }

}
