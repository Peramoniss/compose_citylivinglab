import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/utils/util.service.component';
import { Indicators } from '../../../shared/models/indicators';

@Injectable()
export class CategoryService{

    private _urlCategory:string = "http://localhost:5000/api/v1/categories";
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    constructor(private http: HttpClient,
                private utilsService: UtilService) { }

      public getAllCategories(): Observable<any> {
          let url: string = this._urlCategory;
          return this.http.get<Indicators[]>(url);
      }

}
