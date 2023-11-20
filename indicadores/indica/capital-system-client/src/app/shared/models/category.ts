import { JsonUtils } from "src/app/shared/utils/json-utils.component";

export class Category {
    public code:Number;
    public name_pt:String;
    public name_en:String;
    public description:String;
    public description_en:String;
    public type:String;

    public primaryKeys:Array<string> = [
        "code",
    ];

    constructor(){     
        this.code = 0;
        this.name_pt = '';
        this.name_en = '';
        this.description = '';
        this.description_en = '';
        this.type = '';

    }

    public parseJsonToObject(param: any): Category {
        JsonUtils.getInstance().assign(this,param);
        return this;
    }

}