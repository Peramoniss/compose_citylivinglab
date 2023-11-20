import { DatePipe, formatDate, getLocaleDateFormat } from '@angular/common';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoPageFilter, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { IntegrationStatus } from 'src/app/shared/enums/integration-status.enum';
import { PeriodTypesEnum } from 'src/app/shared/enums/period.enum';
import { SimpleFilter } from 'src/app/shared/models/simple-filter';
import { DataSource, DataSourceExtended } from '../models/data-source';
import { DataSourceAdvancedFilter } from '../models/data-source-advanced-filter';
import { DataSourceService } from '../services/data-source.service';

@Component({
  selector: 'app-data-source-list.component',
  templateUrl: './data-source-list.component.html',
  styleUrls: ['./data-source-list.component.css']
})
export class DataSourceListComponent implements OnInit, AfterContentInit {

  public pageActions: PoPageAction[] = [];
  public  pageTitle:string = 'Gerenciar Fontes de dados';  
  public  advancedFilterTitle:string = "Filtrar busca";
  private filterText:String = "";
  private route:String = '';
  public  objectList: Array<any> = new Array<any>();
  private pageNumber:number = 1;
  private pageSize:number   = 5;
  public  hasNext:boolean = false;
  public  isWaiting: boolean = false;
  public  dataSourcesAdvancedFilter:DataSourceAdvancedFilter = new DataSourceAdvancedFilter();
  public  tableMessage: string = 'Utilize os campos de filtro para pesquisar';
  public  totalSelectRow: number = 0;
  poDialog: any;

  constructor(private dataSourceService:DataSourceService,
              private router:Router,
              private poDialogService:PoDialogService,
              private poNotificationService:PoNotificationService,
              public datepipe: DatePipe) { }

  @ViewChild(PoModalComponent, {static: true}) advancedModal!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
  @ViewChild('copyFileBaseModal', {static: true}) copyFileBaseModal!: PoModalComponent;

  
  ngOnInit(): void {
    this.getObjectByFilter(null,false);
  }
    
  ngAfterContentInit() {
    
  }

  //AÇÕES DA LISTA
  public readonly listActions: Array<PoPageAction> = [
    { label:'Adicionar', url: this.route + '/new' },
    { label:'Integrar',  action: () => { this.addToQueue() }, disabled: this.isPossibleIntegration.bind(this)},
    { label:'Copiar Estrutura',  action: () => { this.onCopyFieldBase() }, disabled: this.isPossibleCopyRecord.bind(this)}
  ];

  //OBJETO DE FILTRO
  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    advancedAction: this.openAdvancedFilter.bind(this),
    placeholder: 'Pesquisar' 
  };

  //COLUNAS DA TABELA
  public tableColumns: Array<PoTableColumn> = [
    { property: 'description', label: 'Descrição', type: 'link', action: (value: any, row: DataSource) => { this.onDetail(row); }},
    { property: 'directory', label: 'Repositório' },
    { property: '$period', label: 'Periodo' },
    { property: '$datePeriod', label: 'Data do Periodo' },
    { property: 'integration', label: 'Status Integração', type: 'label', labels: IntegrationStatus.integrationStatus }
  ];

  //AÇÕES DA TABELA
  public tableActions: Array<PoTableAction> = [
    { label: 'Editar',      action: (row: DataSource) => { this.onEdit(row);    } },    
    { label: 'Remover',     action: (row: DataSource) => { this.onRemove(row);  } },
   // { label: 'Integrar',    action: (row: DataSource) => { this.onIntegration(row);  } },
  ];

  /**
  FUNCÃO RESPONSÁVEL POR CHAMAR A EDIÇÃO
  PARÂMETROS 
  **/
  public onEdit (dataSource:DataSource) {
    if (dataSource != null) {
      this.router.navigate([this.route,'edit',
      dataSource.code         
      ]);
    }   
  }

  /**
    FUNCÃO CHAMADA AO CLICAR NO BOTÃO REMOVER DA LISTAGEM
    PARÂMETROS: 
    **/
  public onRemove (row:any) {
    let dataSource: DataSource = new DataSource();
    dataSource.parseJsonToObject(row);

    if(dataSource != null){
      this.poDialogService.confirm({
        title: 'Confirmar exclusão',
        message: 'Deseja confirmar a exclusão deste registro de fonte de dados?',
        confirm: () => {
            this.dataSourceService.remove(dataSource).pipe().subscribe((result) => {                
                this.poNotificationService.success("Fonte de dados removida com sucesso!");
                this.filterAction();                
            } )
        }
      });
    }
  }

  public onIntegration (row:any) {
    
    let dataSource: DataSource = new DataSource();
    dataSource.parseJsonToObject(row);

    if(dataSource != null){
      this.poDialogService.confirm({
        title: 'Confirmar integração',
        message: 'Deseja confirmar a integração deste registro de fonte de dados?',
        confirm: () => {
            this.dataSourceService.integration(dataSource).pipe().subscribe((result) => {                
                this.poNotificationService.success("Iniciado a integração!");
                this.filterAction();                
            } )
        }
      });
    }
  }

  /**
    FUNCÃO RESPONSÁVEL CHAMAR A  TELA DE INCLUSÃO
  **/
  onNew(){        
    this.router.navigate(['/new']);
  }

  /**
    FUNCÃO RESPONSÁVEL CHAMAR A  TELA DE DETALHE
  **/      
  onDetail(datasource:DataSource){
    if(datasource != null)
        this.router.navigate([this.route,'detail',
          datasource.code         
        ]);
  }

  filterAction(){            
    this.pageNumber = 1;            
    this.dataSourcesAdvancedFilter = new DataSourceAdvancedFilter();

    if((this.filterText != null) && (this.filterText != "")) {
      let simpleFilter: SimpleFilter = new SimpleFilter();
      simpleFilter.search = this.filterText;
      this.getObjectByFilter(simpleFilter,false);  
    }
    else {
      this.getObjectByFilter(null,false);
    }    
  }

  //Ações do filtro avançado
  applyFilterAction: PoModalAction = {
    action: () => {
      this.applyAdvancedFilter();
      this.advancedModal.close();
    },
    label: 'Filtrar'
  };

  closeModalAction: PoModalAction = {
    action: () => {
      this.advancedModal.close();
    },
    label: 'Voltar'
  };

  openAdvancedFilter(){
    this.advancedModal.open();
  }

  applyAdvancedFilter(){  
    this.filterText = "";
    this.getObjectByFilter(this.dataSourcesAdvancedFilter,false);  
  }

      /**
   * Função de busca
   * @param searchObject objeto da busca
   * @param isMore sinaliza se é para concatenar os registros buscados ou não
   */
  getObjectByFilter(searchObject:any,isMore:boolean){
    if(!isMore) {
      this.objectList = [];
      this.pageNumber = 1;
      this.hasNext = false;
    }
    this.isWaiting = true;
    this.dataSourceService.getObjectByFilter(searchObject,this.pageNumber,this.pageSize).subscribe(
        (returnValue) => {
          this.isWaiting = false;
          this.hasNext = returnValue.hasNext;
          this.setItensTable(returnValue.dataSource);
          this.tableMessage = ''; // volta a mensagem padrão da table
        },
        (error) => {
          this.isWaiting = false;
        }
    );
  }

    /**
   * Função que instancia os objetos que serão mostrados na table
   * @param itens objetos da lista
   */
     setItensTable(itens:any){        
      itens.forEach((value: any) => {
        let _obj:DataSource = new DataSource();
        _obj.parseJsonToObject(value);
        const result = new DataSourceExtended().parseJsonToObject(_obj);
        result.$period = PeriodTypesEnum.getPeriodTypesDescription(result.period);
        //result.$datePeriod = result.period == 'A' ? formatDate(result.datePeriod,'YYYY','pt-BR') : formatDate(result.datePeriod,'MM-YYYY', 'pt-BR');
        result.$datePeriod = result.period == 'A' ? this.datepipe.transform(result.datePeriod,'YYYY') : this.datepipe.transform(result.datePeriod,'MM/YYYY');
        
        this.objectList.push(result);
      });
    }

      /**
   * Função de buscar mais registros
   */
  showMoreFunction() {
    this.pageNumber = this.pageNumber + 1;   

    if((this.filterText != null) && (this.filterText != "")){
      let simpleFilter: SimpleFilter = new SimpleFilter();
      simpleFilter.search = this.filterText;
      this.getObjectByFilter(simpleFilter,true); 
    } else {
      this.getObjectByFilter(this.dataSourcesAdvancedFilter,true);
    }    
  }

  addToQueue() {
    const selectedItems = this.poTable.getSelectedRows();
    const filterItems = selectedItems.filter(b => b['$selected'] && (b['integration'] == 'P' || b['integration'] == 'E'));
    
    const dataSources: Array<any> = new Array<any>();
    filterItems.forEach((value: any) => {
      let _obj:DataSource = new DataSource();
      _obj.parseJsonToObject(value);
      dataSources.push(_obj);
    });

    if(dataSources != null){
      this.poDialogService.confirm({
        title: 'Confirmar integração',
        message: 'Deseja confirmar a integração dos registros de fonte de dados selecionados?',
        confirm: () => {
            this.dataSourceService.integrationTeste(dataSources).pipe().subscribe((result) => {                
                this.poNotificationService.success("Iniciado a integração!");
                this.filterAction();                
            } )
        }
      });
    }
  }

  confirmItems(selectedItems: Array<any>) {
    
  }

  sumTotal(row: any) {
      this.totalSelectRow += 1;
  }

  decreaseTotal(row: any) {
      this.totalSelectRow -= 1;
  }

  private isPossibleIntegration():boolean{
    let disabled = true;
    
    const selection = this.objectList.filter(b => b['$selected'] && (b['integration'] == 'P' || b['integration'] == 'E'));
    const selectionBlock = this.objectList.filter(b => b['$selected'] && !(b['integration'] == 'P' || b['integration'] == 'E'));

    if (selection.length > 0 && selectionBlock.length == 0) {
      disabled = false; 
    }

    return disabled;
  }

  private isPossibleCopyRecord():boolean{
    let disabled = true;
    
    if(this.totalSelectRow > 0 && this.totalSelectRow < 2)
      disabled = false;

    return disabled;
    //return true;
  }

  //#region AdvancedFilter actions
  public saveIndicatorsFieldAction: PoModalAction = {
    action: () => {
    if (this.saveIndicatorsField()) {
        this.copyFileBaseModal.close();
    }
    },     
    label: 'Salvar'
  };

  public closeIndicatorsFieldAction: PoModalAction = {
    action: () => {
    this.copyFileBaseModal.close();
    },
    label: 'Cancelar'
  };

  private saveIndicatorsField(): boolean {      
    const selectedItems = this.poTable.getSelectedRows();
    let _obj:DataSource = new DataSource();
    _obj.parseJsonToObject(selectedItems[0]);

    _obj.description = _obj.description + ' COPIA';
    _obj.code = 0;

    if(_obj != null){
      this.dataSourceService.save(_obj, true).pipe().subscribe(
        (result) => {
          this.poNotificationService.success("Estrutura copiada com sucesso!");
          this.totalSelectRow = 0;
          this.filterAction();     
        },
        (error) => {
        }
      );
    }
    
    return true;
  }

  private onCopyFieldBase() {
    this.copyFileBaseModal.open();
  }

}
