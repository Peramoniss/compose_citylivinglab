import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/utils/util.service.component';
import { Indicators } from '../../../shared/models/indicators';

@Injectable()
export class IndicatorsService{

    private _urlIndicators:string = "http://localhost:5000/api/v1/indicators";
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    constructor(private http: HttpClient,
                private utilsService: UtilService) { }

      public getAllIndicators(): Observable<any> {
          let url: string = this._urlIndicators;
          return this.http.get<Indicators[]>(url);
      }

      public getAllByCodeCategory(codeCategory?:Number): Observable<any> {
        let params: string[] = [];
        let url: string = this._urlIndicators + '/category/' + codeCategory;
        return this.http.get<Indicators[]>(url);
      }

      public getIndicatorById(indicators: Indicators): Observable<Indicators> {
        let url = this.utilsService.generateUrlPrimaryKeys(indicators, this._urlIndicators);
        return this.http.get<Indicators>(url);
      }

}
