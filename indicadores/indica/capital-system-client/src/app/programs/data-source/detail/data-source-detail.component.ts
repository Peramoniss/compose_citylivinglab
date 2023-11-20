import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PoDialogService, PoDisclaimer, PoDisclaimerGroupRemoveAction, PoListViewAction, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoSelectOption, PoTableAction, PoTableColumn } from "@po-ui/ng-components";
import { OperatorLogicalEnum } from "src/app/shared/enums/operator-logical.enum";
import { TypeFieldEnum, TypeValueEnum } from "src/app/shared/enums/type-value.enum";
import { Category } from "src/app/shared/models/category";
import { Indicators } from "src/app/shared/models/indicators";
import { CategoryService } from "../../settings/services/category.service";
import { IndicatorsService } from "../../settings/services/indicators.service";
import { CalculationField } from "../models/calculation-field";
import { DataSource } from "../models/data-source";
import { FilterIndicatorsField, FilterIndicatorsFieldExtended } from "../models/filter-indicators-field";
import { IndicatorsField, IndicatorsFieldExtended } from "../models/indicators-field";
import { CalculationFieldService } from "../services/calculation-field.service";
import { DataSourceService } from "../services/data-source.service";
import { FilterIndicatorsFieldService } from "../services/filter-indicators-field.service";
import { IndicatorsFieldService } from "../services/indicators-field.service";

@Component({
    selector: 'app-data-source-detail',
    templateUrl: './data-source-detail.component.html',
    styleUrls: ['./data-source-detail.component.css']
  })
 
export class DataSourceDetailComponent implements OnInit {

    //#region ViewChilds
    @ViewChild('addIndicatorsFieldModal', {static: true}) addIndicatorsFieldModal!: PoModalComponent;
    @ViewChild('addFiltersIndicatorsFieldModal', {static: true}) addFiltersIndicatorsFieldModal!: PoModalComponent;
    //#endregion

    public dataSource:DataSource = new DataSource();
    public indicatorsFieldList: Array<any> = new Array<any>();
    public filterIndicatorsFieldList: Array<any> = new Array<any>();
    public indicatorsField:IndicatorsField = new IndicatorsField();
    public filterIndicatorsField:FilterIndicatorsField = new FilterIndicatorsField();
    public isWaiting: boolean = false;
    public isWaitingFilter: boolean = false;
    public addFiltersIndicatorsFielTitle: String = 'Adicionar Filtros';
    public category: Number = 0;
    public typeFieldOptions: Array<PoSelectOption> = TypeFieldEnum.typeFieldTypes;
    public categoryOptions: Array<Category> = []
    public indicatorsOptions: Array<Category> = []
    public isDisableIndicator: boolean = true;
    public isNew:boolean = false;
    public isNewFilter:boolean = false;
    public isNewCalculationField:boolean = false;
    public showEditFilter:boolean = false;
    public codeIndicatorsField:Number = 0;
    public operatorLogicalTypeOptions: Array<PoSelectOption> = OperatorLogicalEnum.operatorLogicalTypes;
    public typeValueTypeOptions: Array<PoSelectOption> = TypeValueEnum.typeValueTypes;
    public filterTitle: String = '';
    public codeEditor: string = '';
    public calculationFieldList: Array<any> = new Array<any>();
    public fieldCalculationDisclaimer: Array<PoDisclaimer> = [];
    public currentDisclaimers: Array<PoDisclaimer> = [];
    public removedDisclaimer!: PoDisclaimer;
    public showCalculationField:boolean = false;
    public calculationField: CalculationField = new CalculationField();

    //#region AdvancedFilter actions
    public saveIndicatorsFieldAction: PoModalAction = {
        action: () => {
        if (this.saveIndicatorsField()) {
            this.addIndicatorsFieldModal.close();
        }
        },     
        label: 'Salvar'
    };

    public closeIndicatorsFieldAction: PoModalAction = {
        action: () => {
        this.isNew = false;
        this.addIndicatorsFieldModal.close();
        },
        label: 'Cancelar'
    };

    public closeFiltersIndicatorsFieldAction: PoModalAction = {
        action: () => {
        this.filterTitle = '';
        this.addFiltersIndicatorsFieldModal.close();
        },
        label: 'Voltar'
    };
    //#endregion

    public pageActions: Array<PoPageAction> = [
        { label: 'Voltar', action: this.onBack.bind(this), icon: 'po-icon po-icon-exit' }
      ];

    listIndicatorsFieldActions: PoListViewAction[] = [
        { label: 'Adicionar', icon: 'po-icon po-icon-plus', action: this.oncreateIndicatorsField.bind(this) }
    ];

    listFilterIndicatorsFieldActions: PoListViewAction[] = [
        { label: 'Criar um novo Filtro', icon: 'po-icon po-icon-plus', action: this.addFilterIndicatorsField.bind(this) },
        { label: 'Salvar', icon: 'po-icon po-icon-ok', action: this.saveFilterIndicatorsField.bind(this), disabled: this.defaultButtonSaveFilterVisibility.bind(this) }
    ];

    //AÇÕES DA TABELA
    public tableActions: Array<PoTableAction> = [
        { label: 'Editar',      action: (row: IndicatorsField) => { this.onEditIndicatorsField(row);    } },    
        { label: 'Remover',     action: (row: IndicatorsField) => { this.onRemove(row);  } },
        { label: 'Filtros',     action: (row: IndicatorsField) => { this.oncreateFiltersIndicatorsField(row);  } }
    ];

    public filtertableActions: Array<PoTableAction> = [
        { label: 'Editar',      action: (row: FilterIndicatorsField) => { this.onEditFilterIndicatorsField(row);    } },    
        { label: 'Remover',     action: (row: FilterIndicatorsField) => { this.onRemoveFilter(row);  } },
    ];

    //COLUNAS DA TABELA
    public tableColumns: Array<PoTableColumn> = [
        { property: 'field', label: 'Campo|Exp' },
        { property: 'description', label: 'Descrição' },
        { property: '$indicatorsDescription', label: 'Indicador' },
        { property: '$categoryDescription', label: 'Sistema de Capital' },
    ];

    public filterTableColumns: Array<PoTableColumn> = [
        { property: 'fieldFilter', label: 'Campo do arquivo' },
        { property: '$logialOperatorDescription', label: 'Operador'},
        { property: 'valueFilter', label: 'Informação a ser filtrada' },
        { property: '$filterTypeDescription', label: 'Informação a ser filtrada', visible: false },
    ];

    constructor(
        private dataSourceService:DataSourceService,
        private indicatorsFieldService:IndicatorsFieldService,
        private filterIndicatorsFieldService:FilterIndicatorsFieldService,
        private calculationFieldService:CalculationFieldService,
        private indicatorsService:IndicatorsService,
        private categoryService:CategoryService,
        private poDialogService:PoDialogService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poNotificationService:PoNotificationService) { }
    
    ngOnInit() {
        this.activatedRoute.params.pipe().subscribe(
            (params: Params) => {
                if(params.code !== undefined){
                this.dataSource.code = params.code;
                this.dataSourceService.getDataSourceById(this.dataSource).pipe().subscribe(
                    (dataSource) => {
                        this.setData(dataSource);
                        this.getIndicatorFieldObjectByFilter('',dataSource.code);
                    }
                );
                }
            }
            );
    }

    addIndicatorsFielTitle(): String{
        if(this.indicatorsField.typeField == 'N')
            return "Adicionar Campo x Indicador";
        else(this.indicatorsField.typeField == 'EXP')
            return "Adicionar Expressão x Indicador";
    }

    defaultCardVisibility() {
        return true;
    }

    defaultButtonSaveFilterVisibility():boolean {
        return !this.showEditFilter;
    }

    onBack() {
        this.router.navigate(['./'], { relativeTo: this.activatedRoute?.parent });
    }

    setData(dataSource:any){     
        this.dataSource.parseJsonToObject(dataSource);
    }

    getIndicatorFieldObjectByFilter(searchObject:any, baseId:any){
        this.indicatorsFieldList = [];
        this.indicatorsFieldService.getObjectByFilter(searchObject,baseId).subscribe(
            (returnValue) => {
              this.isWaiting = false;
              this.setItensTable(returnValue.indicatorsField);
            },
            (error) => {
              this.isWaiting = false;
            }
        );
    }

    setItensTable(itens:any){ 
        if(itens){
            this.indicatorsService.getAllIndicators().subscribe(
                (returnValue) => {
                    this.categoryService.getAllCategories().subscribe(
                        (returnCategory) => {
                            itens.forEach((value: any) => {
                                let codeIndicator = 0;
                                let _obj:IndicatorsField = new IndicatorsField();
                                _obj.parseJsonToObject(value);
                                const result = new IndicatorsFieldExtended().parseJsonToObject(_obj);
                                codeIndicator = returnValue ? returnValue.find((x: { code: any; }) => x.code == value.indicatorCode).codeCategory : 0;
                                result.$indicatorsDescription = returnValue ? returnValue.find((x: { code: any; }) => x.code == value.indicatorCode).name_pt : "";
                                result.$categoryDescription = returnCategory ? returnCategory.find((x: { code: any; }) => x.code == codeIndicator).name_pt : "";
                                this.indicatorsFieldList.push(result);
                        });
                    });
                },
                (error) =>{}
            );

        }
      }

    private oncreateFiltersIndicatorsField(indicatorsField:IndicatorsField) {
        this.isNewFilter = false;
        this.showEditFilter = false;
        this.codeIndicatorsField = indicatorsField.code;
        this.addFiltersIndicatorsFieldModal.open();
        this.getFiltersIndicatorFieldObjectByFilter('',indicatorsField.code)
    }

    getFiltersIndicatorFieldObjectByFilter(searchObject:any, indicatorsFieldId:any){
        this.filterIndicatorsFieldList = [];
        this.filterIndicatorsFieldService.getObjectByFilter(searchObject,indicatorsFieldId).subscribe(
            (returnValue) => {
              this.isWaitingFilter = false;
              this.setItensTableFilter(returnValue.filters);
            },
            (error) => {
              this.isWaitingFilter = false;
            }
        );
    }

    setItensTableFilter(itens:any){        
        itens.forEach((value: any) => {
          let _obj:FilterIndicatorsField = new FilterIndicatorsField();
          _obj.parseJsonToObject(value);
          const result = new FilterIndicatorsFieldExtended().parseJsonToObject(_obj);
          result.$logialOperatorDescription = OperatorLogicalEnum.getOperatorLogicalTypesDescription(result.logicalOperator);
          result.$filterTypeDescription = TypeValueEnum.getTypeValueTypesDescription(result.filterType);
          this.filterIndicatorsFieldList.push(result);
        });
      }

    private oncreateIndicatorsField() {
        this.indicatorsField = new IndicatorsField();
        this.calculationFieldList = [];
        this.calculationField = new CalculationField();
        this.fieldCalculationDisclaimer = []; 
        this.indicatorsField.code = 0;
        this.isNew = true;
        this.isNewCalculationField = true;
        this.getCategoryOptions();
        this.addIndicatorsFieldModal.open();
    }

    private onEditIndicatorsField(indicatorsField:IndicatorsField) {
        let indicators = new Indicators();
        this.isNew = false;
        this.isNewCalculationField = false;
        this.codeIndicatorsField = indicatorsField.code;
        indicators.code = indicatorsField.indicatorCode;
        this.getCalculationField('',indicatorsField.code);
        this.indicatorsService.getIndicatorById(indicators).subscribe(
            (returnIndicators) => {
                this.indicatorsField = indicatorsField;
                this.category = returnIndicators.codeCategory;
                this.getCategoryOptions();
                this.changeCategory(this.category);
                this.addIndicatorsFieldModal.open();
        });

    }

    private onEditFilterIndicatorsField(filterIndicatorsField:FilterIndicatorsField) {
        this.isNewFilter = false;
        this.showEditFilter = true;
        this.filterTitle = 'Editando o filtro:';
        this.filterIndicatorsField = filterIndicatorsField;
        if(this.filterIndicatorsField.filterType == 'S')
            this.filterIndicatorsField.valueFilter = filterIndicatorsField.valueFilter.substring(1, filterIndicatorsField.valueFilter.length-1);
    }

    public onRemove (row:any) {
        let indicatorsField: IndicatorsField = new IndicatorsField();
        indicatorsField.parseJsonToObject(row);
    
        if(indicatorsField != null){
          this.poDialogService.confirm({
            title: 'Confirmar exclusão',
            message: 'Deseja confirmar a exclusão deste registro de vínculo de para ?',
            confirm: () => {
                this.indicatorsFieldService.remove(indicatorsField).pipe().subscribe((result) => {                
                    this.poNotificationService.success("Registro de para removido com sucesso!");
                    this.getIndicatorFieldObjectByFilter('',this.dataSource.code);              
                } )
            }
          });
        }
    }

    public onRemoveFilter (row:any) {
        let filterIndicatorsField: FilterIndicatorsField = new FilterIndicatorsField();
        filterIndicatorsField.parseJsonToObject(row);
    
        if(filterIndicatorsField != null){
          this.poDialogService.confirm({
            title: 'Confirmar exclusão',
            message: 'Deseja confirmar a exclusão deste registro de filtro ?',
            confirm: () => {
                this.filterIndicatorsFieldService.remove(filterIndicatorsField).pipe().subscribe((result) => {                
                    this.poNotificationService.success("Filtro removido com sucesso!");
                    this.getFiltersIndicatorFieldObjectByFilter('',filterIndicatorsField.codeIndicatorsField);              
                } )
            }
          });
        }
    }

    private getCategoryOptions(){
        this.categoryService.getAllCategories().subscribe(
            (returnValue) => {
                this.categoryOptions = returnValue.map((item: { code: any; name_pt: any; }) => ({
                    value: item.code,
                    label: item.name_pt
                }));
        });
    }

    private saveIndicatorsField(): boolean {      
        this.indicatorsField.dataSourceCode = this.dataSource.code;
        this.indicatorsFieldService.save(this.indicatorsField, this.isNew).pipe().subscribe(
            (result) => {
              this.poNotificationService.success("Vínculo do campo " 
                                                    + (this.isNew ? "cadastrada" : "alterada")
                                                    + " com sucesso!");
              if(this.isNewCalculationField)
                this.saveListCalculationField(result.data);
              this.getIndicatorFieldObjectByFilter('',this.dataSource.code);
            },
            (error) => {
            }
          );
      
      return true;
    }
    
    public changeCategory(codeCategory:any){
        this.indicatorsService.getAllByCodeCategory(codeCategory).subscribe(
            (returnValue) => {
                this.indicatorsOptions = returnValue.map((item: { code: any; name_pt: any; }) => ({
                    value: item.code,
                    label: item.name_pt
                }));
            this.isDisableIndicator = false;
        });
    }

    public addFilterIndicatorsField(){
        this.filterIndicatorsField = new FilterIndicatorsField();
        this.isNewFilter = true;
        this.showEditFilter = true;
        this.filterTitle = 'Criando um novo filtro:'
    }

    public saveFilterIndicatorsField(){
        this.filterIndicatorsField.codeIndicatorsField = this.codeIndicatorsField;
        if(this.filterIndicatorsField.filterType == 'S')
          this.filterIndicatorsField.valueFilter = '"' + this.filterIndicatorsField.valueFilter + '"'
        this.filterIndicatorsFieldService.save(this.filterIndicatorsField, this.isNewFilter).pipe().subscribe(
            (result) => {
              this.poNotificationService.success("Filtro do indicador " 
                                                    + (this.isNewFilter ? "cadastrada" : "alterada")
                                                    + " com sucesso!");
              this.getFiltersIndicatorFieldObjectByFilter('',this.codeIndicatorsField);
              this.filterTitle = '';
              this.showEditFilter = false;
            },
            (error) => {
                this.filterTitle = '';
            }
          );     
    }

    
    private getCalculationField(searchObject:any, indicatorsFieldId:any){
        this.calculationFieldService.getObjectByFilter(searchObject,indicatorsFieldId).subscribe(
            (returnValue) => {
                returnValue.calculationField.forEach((value: any) => {
                    let _obj:CalculationField = new CalculationField();
                    _obj.parseJsonToObject(value);
                    this.calculationFieldList.push(_obj);
                  });
                
                this.changeCalculationFieldDisclaimer(returnValue.calculationField);
                
            },
            (error) => {
              this.isWaitingFilter = false;
            }
        );
        
    }

    public changeCalculationFieldDisclaimer(calculationFieldList:Array<any>){
        this.fieldCalculationDisclaimer = calculationFieldList.map((item: { code: any; field: any; }) => ({
            value: item.code,
            label: item.field
        }));

        this.currentDisclaimers = [...this.fieldCalculationDisclaimer];
    }

    public addCalculationField(){
        this.calculationField = new CalculationField();
        this.showCalculationField = !this.showCalculationField;
    }

    changeFilters(filters: Array<PoDisclaimer>) {
    }

    removefieldCalculationDisclaimer(){
        const difference = this.currentDisclaimers.filter(x => !this.fieldCalculationDisclaimer.includes(x));
        this.removedDisclaimer = difference[0];
        this.currentDisclaimers = [...this.fieldCalculationDisclaimer];
        var filterRemove = this.removedDisclaimer.label;

        if(!this.isNewCalculationField){
            if(this.removedDisclaimer != null){
                let calculationField: CalculationField = new CalculationField();
                calculationField.code = this.removedDisclaimer.value;
                calculationField.codeIndicatorsField = this.codeIndicatorsField;

                this.calculationFieldService.remove(calculationField).pipe().subscribe((result) => {                
                    this.poNotificationService.success("Campo removido!");
                } )
              }
        }else{
            this.calculationFieldList = this.calculationFieldList.filter(function(value, index, arr){ 
                return value.field != filterRemove;
            });
            this.poNotificationService.success("Campo removido!");
        }
    }

    public saveCalculationField(){
        this.calculationField.codeIndicatorsField = this.codeIndicatorsField;
        if(!this.isNewCalculationField){
            this.calculationFieldService.save(this.calculationField, true).pipe().subscribe(
                (result) => {
                this.poNotificationService.success("Filtro do indicador cadastrada com sucesso!");
                this.getCalculationField('',this.calculationField.codeIndicatorsField);
                this.addCalculationField();
                },
                (error) => {
                }
            ); 
        }else{
            this.calculationFieldList.push(this.calculationField);
            this.changeCalculationFieldDisclaimer(this.calculationFieldList);
            this.addCalculationField();
        }
    }

    public saveListCalculationField(codeIndicatorFiel:any){
        this.calculationFieldList.forEach((value: any) => {
            let _obj:CalculationField = new CalculationField();
            _obj.parseJsonToObject(value);
            _obj.codeIndicatorsField = codeIndicatorFiel;
            this.calculationFieldService.save(_obj, true).pipe().subscribe(
                (result) => {
                },
                (error) => {
                }
            ); 
        });
    }

}