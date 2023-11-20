import { JsonUtils } from "src/app/shared/utils/json-utils.component";

export class FilterIndicatorsField {
    public code:Number;
    public codeIndicatorsField:Number;
    public fieldFilter:String;
    public logicalOperator:String;
    public valueFilter:String;
    public filterType:String;
    public createDate:Date;
    public updateDate:Date;

    public primaryKeys:Array<string> = [
        "code","codeIndicatorsField",
    ];

    constructor(){     
        this.code = 0;
        this.codeIndicatorsField = 0;
        this.fieldFilter = '';
        this.logicalOperator = '';
        this.valueFilter = '';
        this.filterType = 'S';
        this.createDate = new Date();
        this.updateDate = new Date();
    }

    public parseJsonToObject(param: any): FilterIndicatorsField {
        JsonUtils.getInstance().assign(this,param);
        return this;
    }

}


export class FilterIndicatorsFieldExtended extends FilterIndicatorsField {

    public $logialOperatorDescription: string | undefined;
    public $filterTypeDescription: string | undefined;
  
    public parseJsonToObject(param: any): FilterIndicatorsFieldExtended {
      JsonUtils.getInstance().assign(this,param);
      return this;
    } 
  }
