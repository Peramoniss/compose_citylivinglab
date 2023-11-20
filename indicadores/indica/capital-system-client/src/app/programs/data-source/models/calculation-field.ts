import { JsonUtils } from "src/app/shared/utils/json-utils.component";

export class CalculationField {
    public code:Number;
    public codeIndicatorsField:Number;
    public field:String;
    public fieldType:String;
    public createDate:Date;
    public updateDate:Date;

    public primaryKeys:Array<string> = [
        "code","codeIndicatorsField",
    ];

    constructor(){     
        this.code = 0;
        this.codeIndicatorsField = 0;
        this.field = '';
        this.fieldType = 'N';
        this.createDate = new Date();
        this.updateDate = new Date();
    }

    public parseJsonToObject(param: any): CalculationField {
        JsonUtils.getInstance().assign(this,param);
        return this;
    }

}

