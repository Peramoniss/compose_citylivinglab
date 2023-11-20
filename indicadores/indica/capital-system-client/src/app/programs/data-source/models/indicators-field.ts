import { JsonUtils } from "src/app/shared/utils/json-utils.component";
import { Indicators } from "../../../shared/models/indicators";

export class IndicatorsField {
    public code:Number;
    public dataSourceCode:Number;
    public field:String;
    public typeField:String;
    public description:String;
    public sizeField:String;
    public initValue:Number;
    public endValue:Number;
    public indicatorCode:Number;
    public indicator!:Indicators;

    public primaryKeys:Array<string> = [
        "code","dataSourceCode",
    ];

    constructor(){     
        this.code = 0;
        this.dataSourceCode = 0;
        this.field = '';
        this.typeField = 'N';
        this.description = '';
        this.sizeField = '';
        this.initValue = 0;
        this.endValue = 0;
        this.indicatorCode = 0;
    }

    public parseJsonToObject(param: any): IndicatorsField {
        JsonUtils.getInstance().assign(this,param);
        return this;
    }

}

export class IndicatorsFieldExtended extends IndicatorsField {

    public $indicatorsDescription: String | undefined;
    public $categoryDescription: String | undefined;
  
    public parseJsonToObject(param: any): IndicatorsFieldExtended {
      JsonUtils.getInstance().assign(this,param);
      return this;
    } 
  }
