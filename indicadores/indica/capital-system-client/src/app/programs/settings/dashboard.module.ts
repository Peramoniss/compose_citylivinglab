import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CategoryService } from './services/category.service';
import { IndicatorsService } from './services/indicators.service';

const modules = [
  DashboardRoutingModule,
];
const components = [
  DashboardComponent
];
const services = [
  IndicatorsService,
  CategoryService,

];
const lookups: any[] = [];
const directives: any[] = [];
const pipes: any[] = [];
@NgModule({
  bootstrap: [DashboardComponent],
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
export class DashboardModule { }
