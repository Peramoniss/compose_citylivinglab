import { NgModule } from '@angular/core';
import { MonthPeriodPipe } from 'src/app/shared/pipes/month-period.pipe';
import { PeriodPipe } from 'src/app/shared/pipes/period.pipe';
import { SharedModule } from 'src/app/shared.module';
import { UtilService } from 'src/app/shared/utils/util.service.component';
import { DataSourceRoutingModule } from './data-source-routing.module';
import { DataSourceDetailComponent } from './detail/data-source-detail.component';
import { DataSourceEditComponent } from './edit/data-source-edit.component';
import { DataSourceListComponent } from './list/data-source-list.component';
import { CalculationFieldService } from './services/calculation-field.service';
import { DataSourceService } from './services/data-source.service';
import { FilterIndicatorsFieldService } from './services/filter-indicators-field.service';
import { IndicatorsFieldService } from './services/indicators-field.service';

const modules = [
  DataSourceRoutingModule,
];
const components = [
  DataSourceListComponent,
  DataSourceEditComponent,
  DataSourceDetailComponent,
];
const services = [
  DataSourceService,
  IndicatorsFieldService,
  FilterIndicatorsFieldService,
  CalculationFieldService,
  UtilService,
];
const lookups: any[] = [];
const directives: any[] = [];
const pipes = [
  PeriodPipe,
  MonthPeriodPipe
];
@NgModule({
  bootstrap: [DataSourceListComponent],
  declarations: [
    ...components,
    ...directives,
    ...pipes,
  ],
  imports: [
    ...modules,
    SharedModule.forRoot()
  ],
  exports: [
    ...modules,
    ...components,
    ...directives,
    ...pipes,
  ],
  providers: [
    ...services,
    ...lookups
  ]
})
export class DataSourceModule { }
