import { JsonUtils } from "src/app/shared/utils/json-utils.component";

export class Indicators {
    public code:Number;
    public name_pt:String;
    public name_en:String;
    public codeCategory:Number;

    public primaryKeys:Array<string> = [
        "code",
    ];

    constructor(){     
        this.code = 0;
        this.name_pt = '';
        this.name_en = '';
        this.codeCategory = 0;
    }

    public parseJsonToObject(param: any): Indicators {
        JsonUtils.getInstance().assign(this,param);
        return this;
    }

}