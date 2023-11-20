import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { DataSource } from '../models/data-source';
import { DataSourceService } from '../services/data-source.service';
import { PeriodMonthEnum, PeriodTypesEnum } from 'src/app/shared/enums/period.enum';
import { DatePipe, formatDate } from '@angular/common';
import { FileTypeEnum } from 'src/app/shared/enums/file-type.enum';

@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: [],
  providers: [DataSourceService]
})
export class DataSourceEditComponent implements OnInit {

  private route:String = '';
  public  dataSource:DataSource = new DataSource();
  public  action:string = "Incluir";  
  public  isNew:Boolean = true;
  public  periodTypeOptions: Array<PoSelectOption> = PeriodTypesEnum.periodTypes;
  public  periodMonthOptions: Array<PoSelectOption> = PeriodMonthEnum.periodMonth;
  public  fileTypeOptions: Array<PoSelectOption> = FileTypeEnum.fileTypeTypes;
  public  year:string | null = '';
  public  month:string | null = '';

  public loadingStatus = {
    active: false,
    message: '',
  }

  constructor(private dataSourceService:DataSourceService,
              private activatedRoute: ActivatedRoute, 
              private router:Router,
              private poNotificationService:PoNotificationService,
              public datepipe: DatePipe) { }

  ngOnInit() {
    this.dataSource = new DataSource();
    this.isNew = true;
    this.dataSource.code = 0;

    this.activatedRoute.params.pipe(take(1)).subscribe(
      (params: Params) => {        
        if(params.code !== undefined){
          this.dataSource.code = params.code;
          this.isNew = false;
          this.dataSourceService.getDataSourceById(this.dataSource).pipe(take(1)).subscribe(
            (dataSource) => {
              this.year = this.datepipe.transform(dataSource.datePeriod,'YYYY');
              this.month = this.datepipe.transform(dataSource.datePeriod,'MM');
              this.setData(dataSource);
            });
        }
      }
    );
  }

  cancel(){
    this.router.navigate(['./'], { relativeTo: this.activatedRoute?.parent });
  }

  save(){
    this.showLoading('Salvando dados...');

    if(this.dataSource.period == 'A')
      this.month = '12';
    var newDate = new Date(Number(this.year),Number(this.month)-1,1);
    this.dataSource.datePeriod = newDate;

    this.dataSourceService.save(this.dataSource, this.isNew).pipe(take(1)).subscribe(
      (result) => {
        this.poNotificationService.success("Fonte de dados " 
                                              + (this.isNew ? "cadastrada" : "alterada")
                                              + " com sucesso!");
        this.hideLoading();
        this.router.navigate([this.route]);
      },
      (error) => {
        this.hideLoading();
      }
    );
  }

  setData(dataSource: any){    
    this.dataSource.parseJsonToObject(dataSource);
  }

  private showLoading(message?:string) {
    this.loadingStatus.message = (message || '');
    this.loadingStatus.active = true;
  }

  private hideLoading() {
    this.loadingStatus.active = false;
    this.loadingStatus.message = '';
  }
}
