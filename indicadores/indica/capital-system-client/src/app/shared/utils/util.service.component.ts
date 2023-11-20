import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    
    constructor() {
    }

    generateUrlPrimaryKeys(obj:any, url?:string) {
        let values: Array<string> = [];
        
        obj.primaryKeys.forEach(function(key: string | number){                
            values.push(obj[key]);
        });     
        
        return url += "/" + values.join('/');
    }

}
