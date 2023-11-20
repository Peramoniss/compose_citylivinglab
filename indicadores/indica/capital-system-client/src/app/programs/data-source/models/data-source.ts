import { JsonUtils } from "src/app/shared/utils/json-utils.component";

export class DataSource {
    public code:Number;
    public description:String;
    public webSite:String;
    public period:String;
    public datePeriod?:Date;
    public fileType:String;
    public header:String;
    public separator:String;
    public directory:String;
    public cityField:String;
    public integration:String;
    public dateIntegration?:Date;
    public createDate:Date;
    public updateDate:Date;

    public primaryKeys:Array<string> = [
        "code",
    ];

    constructor(){     
        this.code = 0;
        this.description = '';
        this.webSite = '';
        this.period = '';
        this.datePeriod = undefined;
        this.fileType = 'csv';
        this.header = '';
        this.separator = '';
        this.directory = '';
        this.cityField = '';
        this.integration = 'P';
        this.dateIntegration = undefined;
        this.createDate = new Date();
        this.updateDate = new Date();
    }

    public parseJsonToObject(param: any): DataSource {
        JsonUtils.getInstance().assign(this,param);
        return this;
    }

}

export class DataSourceExtended extends DataSource {

    public $period: string | undefined | null;
    public $datePeriod: string | undefined | null;
  
    public parseJsonToObject(param: any): DataSourceExtended {
      JsonUtils.getInstance().assign(this,param);
      return this;
    } 
  }
